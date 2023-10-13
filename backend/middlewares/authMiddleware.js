const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")

const JWT_SECRET = "swetha123";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log("error in token")
      res.status(400).json({error:'invalid token'});
     
    }
  }

  if (!token) {
    
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports= { protect };