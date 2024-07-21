const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utility/generateToken");
const sendMail = require("../utility/sendMail");
const otpHandler = require("../utility/otpHandler");
const asyncHandler = require("express-async-handler");
const authenticate = require("../middlewares/authMiddleware");
const roles = require("../utility/roles");

// Register user
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    const newUser = req.body;

    const user = await User.findOne({ email: newUser.email });

    if (user) {
      return res.status(400).json({ message: "User with email already exists !!" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 13);
    newUser.password = hashedPassword;

    const newUserInstance = new User(newUser);
    newUserInstance.role = roles.USER;
    const savedUser = await newUserInstance.save();

    res.status(201).json({
      message: "User registered successfully !!",
      data: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  })
);

// User login
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, {
        id: user._id,
        email: user.email,
      });
      res.status(200).json({
        isAuthenticated: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || "user",
      });
    } else {
      res.status(400).json({ message: "Invalid email or password!" });
    }
  })
);

// Forgot password
router.post(
  "/forgotPassword",
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpHandler.generateOTP();
    otpHandler.storeOTP(email, otp, 10);
    await sendMail(email, otp);

    res.status(200).json({ message: "Reset password email sent!" });
  })
);

// Reset password
router.post(
  "/resetPassword",
  
  asyncHandler(async (req, res, next) => {
    const { otp, password } = req.body;

    const email = await otpHandler.getStoredEmail(otp);

    if (!email) {
      return res.status(400).json({ message: "Link expired, try again!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 13);
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  })
);

// Logout
router.post(
  "/logout",
  asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out!" });
  })
);

// Update user profile
router.patch(
  "/profile",
  authenticate,
  asyncHandler(async (req, res, next) => {
    const { _id, name, email, phone, password } = req.body;

    const user = await User.findById(_id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      if (password) {
        user.password = await bcrypt.hash(password, 13);
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role || "user",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

module.exports = router;
