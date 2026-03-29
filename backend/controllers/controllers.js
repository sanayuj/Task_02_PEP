require("dotenv").config();
const User = require("../models/userModel");
const Document = require("../models/documentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = "7d";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, "DDDDAAAAAA");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch, "$$$$$");
      if (passwordMatch) {
        const token = createToken(user._id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          user,
          message: "Authentication successful",
          success: true,
          token,
        });
      } else {
        return res.json({ message: "Incorrect password", success: false });
      }
    } else {
      return res.json({ message: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);

    return res.json({ message: "Internal server error", success: false });
  }
};

module.exports.userHeader = async (req, res, next) => {
  try {
    const userDetails = req.user;
    return res.json({ status: true, userDetails: userDetails });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in useHeader",
      status: false,
    });
  }
};

module.exports.createDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const newDoc = await Document.create({
      title: "Untitled Document",
      content: "",
      owner: userId,
      collaborators: [],
      activeUsers: [],
    });

    res.status(201).json({
      success: true,
      message: "Document created successfully",
      document: newDoc,
    });
  } catch (error) {
    console.log("Create Document Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create document",
    });
  }
};

module.exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title } = req.body;
    const userId = req.user.id;

    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Check if owner
    const isOwner = doc.owner.toString() === userId;

    // Check if collaborator
    const collaborator = doc.collaborators.find(
      (c) => c.user.toString() === userId,
    );

    // Check edit permission
    const canEdit = isOwner || (collaborator && collaborator.role === "editor");

    if (!canEdit) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to edit this document",
      });
    }

    // Update document
    doc.content = content ?? doc.content;
    doc.title = title ?? doc.title;
    doc.updatedAt = Date.now();

    await doc.save();

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: doc,
    });
  } catch (error) {
    console.log("Update Document Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating document",
    });
  }
};

module.exports.getAllDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const docs = await Document.find({
      $or: [{ owner: userId }, { "collaborators.user": userId }],
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "Documents fetched successfully",
      data: docs,
    });
  } catch (error) {
    console.log("Get All Documents Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching documents",
    });
  }
};

module.exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.autoSaveDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteDocumentByid = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoc = await Document.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      data: deletedDoc,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports.shareDocument = async (req, res) => {
  try {
    console.log("inside the share Doc");

    const { id } = req.params; // document id
    const { email, role } = req.body;
    const currentUserId = req.user.id;

    // Validation
    if (!email || !role) {
      return res.json({
        success: false,
        message: "Email and role are required",
      });
    }

    if (!["viewer", "editor"].includes(role)) {
      return res.status.json({
        success: false,
        message: "Role must be viewer or editor",
      });
    }

    const doc = await Document.findById(id);

    if (!doc) {
      return res.json({
        success: false,
        message: "Document not found",
      });
    }

    if (doc.owner.toString() !== currentUserId) {
      return res.json({
        success: false,
        message: "Only owner can share this document",
      });
    }

    const userToShare = await User.findOne({ email });

    if (!userToShare) {
      return res.json({
        success: false,
        message: "Email not found",
      });
    }

    if (userToShare._id.toString() === currentUserId) {
      return res.json({
        success: false,
        message: "You already own this document",
      });
    }

    // Check if already shared
    const existingCollaborator = doc.collaborators.find(
      (collab) => collab.user.toString() === userToShare._id.toString(),
    );

    if (existingCollaborator) {
      existingCollaborator.role = role;
    } else {
      doc.collaborators.push({
        user: userToShare._id,
        role,
      });
    }

    await doc.save();

    res.status(200).json({
      success: true,
      message: `Document shared successfully as ${role}`,
      data: doc,
    });
  } catch (error) {
    console.log("Share Document Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sharing document",
    });
  }
};


module.exports.getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};


module.exports.logout=(req,res)=>{
   try {
    console.log("Entered!!");
    
    res.clearCookie("token");


    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out",
    });
  }
}