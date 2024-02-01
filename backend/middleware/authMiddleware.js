const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
// const Accountant = require("../models/accountantSchema");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token ");
  }
});

const isStudent = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authorized, no requested user" });
  }

  //Fetch the user's role from the database or based on accountant model
  const user = await User.findById({ _id: req.body._id });
  console.log(user, "dispaly user");

  if (!user) {
    return res.status(401).json({ error: "Not authorized , user not found" });
  }

  if (user.role === "student") {
    isStudent = true;
    next();
  } else {
    return res.status(403).json({ error: "NOt authorized , not an student" });
  }
});
module.exports = { protect, isStudent };
