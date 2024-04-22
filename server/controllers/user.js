const Users = require("../models/users");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
});

const checkPasswordLength = (password) => {
  return password.length < 6 ? true : false;
};

const containsNumber = (password) => {
  const numbers = /[0-9]/;
  return numbers.test(password);
};

const containsSymbol = (password) => {
  const symbols = /[!@#$%^&*(){}:;?<>]/;
  return symbols.test(password);
};

// generating otp-
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9999);
};

// register user-

const registerUser = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }
    // checking the length of the password-
    if (checkPasswordLength(password)) {
      return res.status(422).json({
        success: false,
        message: "Password must be greater than 6 characters",
      });
    }
    if (!containsNumber(password)) {
      return res
        .status(422)
        .json({ success: false, message: "Password must contain number" });
    }
    if (!containsSymbol(password)) {
      return res
        .status(422)
        .json({ success: false, message: "Password must contain symbol" });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //sending otp//
    const otp = generateOtp();

    const newUser = new Users({
      name,
      email,
      password,
      number,
      otp,
      password: hashedPassword,
    });

    const info = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your OTP",
      text: `Your One Time Password is ${otp}`,
    };

    const savedUser = await newUser.save();

    await transport.sendMail(info);

    res.status(201).json({
      success: true,
      message: "Sign up successfully. Please verify your account with OTP",
      savedUser: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//verify OTP//
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(`OTP is ${otp}`);

    let user = await Users.findOne({ email });

    if (!user)
      return res.status(400).json({ success: false, message: "No User Found" });

    if (user.otp !== otp)
      return res.status(400).json({ success: false, message: "Wrong OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email Verification Successful! You can now login.",
    });
  } catch (error) {
    console.log("Error in verify Otp : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//login user//
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid Email Address!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(422).json({
        success: false,
        message: "Incorrect password",
      });

    // Creating a new token
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    // Updating the user's token field in the database
    user.token = token;
    await user.save();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httponly: true,
    });

    // Sending the response
    res.status(200).json({
      success: true,
      user: user,
      token: token,
      message: "Logged In successfully!",
    });
  } catch (error) {
    console.log("Login User Error : ", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

//logout user//
const logOutUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res.status(400).json({
        success: false,
        message: "You are already logged out!",
      });

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      const user = await Users.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      user.token = null;
      await user.save();
      res.clearCookie("token");
      res.json({ success: true, message: "Logged out" });
      return;
    }
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).send({ message: "Users fetched successfully", users: users });
};

module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  logOutUser,
  getAllUsers,
};
