const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log(req.cookies,"COookiess");
    
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json(null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log(req.user,"User data from middleware!!!!");
    
    next();
  } catch (err) {
    return res.status(401).json(null);
  }
};

module.exports = authMiddleware;