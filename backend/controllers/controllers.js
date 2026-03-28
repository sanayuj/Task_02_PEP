require("dotenv").config();
const User=require("../models/userModel")
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
  const { emailId, loginPassword } = req.body;
  try {
    const user = await userModel.findOne({ email: emailId });
    if(user.blockStatus){
      return res.json({message:"Admin temporay blocked you!",success:false})
    }
    if (user) {
      const passwordMatch = await bcrypt.compare(loginPassword, user.password);
      if (passwordMatch) {
        const token = createToken(user._id);
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