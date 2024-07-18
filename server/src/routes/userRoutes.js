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
router.post("/", async (req, res, next) => {
  const newUser = req.body;

  try {
    let user = await User.findOne({ email: newUser.email });

    if (user) {
      return res.status(400).json({ message: "User already exists !!" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 13);
    newUser.password = hashedPassword;

    user = new User(newUser);
    user.role = roles.USER;
    const userA = await user.save();

    res.status(201).json({
      message: "User registered successfully !!",
      data: {
        _id: userA._id,
        name: userA.name,
        email: userA.email,
        role: userA.role,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to register user!", error: error.message });
  }
});

// User login
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    console.log("login api called !! ");

    const { email, password } = req.body;

    console.log("Login :" + email, password);

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
      res.status(400);
      throw new Error("Invalid email or password !");
    }
  })
);

//forgot  password
router.post("/forgotPassword", async (req, res, next) => {
  const { email } = req.body;
  try {
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const otp = otpHandler.generateOTP();
    console.log(otp);
    otpHandler.storeOTP(email, otp, 10);
    await sendMail(email, otp);

    res.status(200).json({ message: "Reset password email sent !" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

//reset password
router.post("/resetPassword", async (req, res, next) => {
  const { otp, password } = req.body;
  console.log(otp, password);
  try {
    const email = await otpHandler.getStoredEmail(otp);
    if (!email) {
      res.status(400);
      throw new Error("Time lmit exceeded, try again !");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully !" });
  } catch (error) {
  next();
  }
});

//logout
router.post(
  "/logout",
  asyncHandler(async (req, res, next) => {
    console.log("Logout function called !!");
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out !" });
  })
);

// @desc    Update user profile
// @route   PUT /user/profile
// @access  Private
router.patch("/profile", async (req, res, next) => {
  //authenticate ,
  console.log("Update profile api called !!!");
  const user = await User.findById(req.body._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role || "user",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = router;
