require("dotenv").config();
const User=require("../models/userModel")
const Document=require("../models/documentModel")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const maxAge="7d"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};


module.exports.signup = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    console.log(name,email, password, "DDDDAAAAAA");

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
    console.log(req.body,"Inside controller!!!!!!");
    
    const user = await User.findOne({ email: email });
   
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch,"$$$$$");
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

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      {
        content,
        ...(title && { title }),
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: updatedDoc,
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
    const docs = await Document.find().sort({ updatedAt: -1 });

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