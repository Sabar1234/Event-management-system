require("dotenv").config();
const Admin = require("../models/adminModal");
const events = require("../models/events");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//sign-up
const adminSignup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log("AdminUsername", userName);
    console.log("AdminPassword", password);
    const admin = await Admin.findOne({ userName });
    if (admin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      userName,
      password: hashedPassword,
      isVerified: true,
    });
    await newAdmin.save();
    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
      success:true
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log("Error in Admin-signup", error.message);
  }
};

//login
const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const isMatchedPassword = await bcrypt.compare(password, admin.password);
    if (!isMatchedPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const adminToken = await jwt.sign(
      { _id: admin._id },
      process.env.SECRET_KEY
    );
    admin.token = adminToken;

    await admin.save();

    res.cookie("AdminToken", adminToken, {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httponly: true,
    });

    res.status(200).json({
      success: true,
      admin: admin,
      adminToken: adminToken,
      message: "Logged In successfully!",
    });
  } catch (error) {
    console.log("Login Admin Error : ", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//Admin logOut//
const logOut = async (req, res) => {
  try {
    const { AdminToken } = req.cookies;
    if (!AdminToken) {
      return res.status(400).json({
        success: false,
        message: "You are not logged in!",
      });
    }

    const decoded = await jwt.verify(AdminToken, process.env.SECRET_KEY);

    if (decoded) {
      const admin = await Admin.findById(decoded._id);

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      admin.token = null;
      await admin.save();
      res.clearCookie("AdminToken");
      res.json({ success: true, message: "Logged out successfully" });
      return;
    }
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//for approving event
const statusApprove = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("ApprovedEventId", eventId);

    const event = await events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }
    event.status = "APPROVED";
    await event.save();
    res.status(200).json({
      message: "Event approved successfully",
      event: event,
    });
  } catch (error) {
    console.error("Approve Event Error: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//for cancel event
const statusCancel = async (req, res) => {
  try {
    const { eventId } = req.params;
    console.log("CanceledEventId", eventId);

    const event = await events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }
    event.status = "CANCELLED";
    await event.save();
    res.status(200).json({
      message: "Event cancelled successfully",
      event: event,
    });
  } catch (error) {
    console.error("Cancel Event Error: ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//Check Auth
const CheckAuth = async (req, res) => {
  try {
    const { AdminToken } = req.cookies;
    // console.log(AdminToken);

    if (!AdminToken) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Access!" });
    }

    const decoded = await jwt.verify(AdminToken, process.env.SECRET_KEY);

    if (decoded) {
      const admin = await Admin.findById(decoded._id);

      if (!admin) {
        return res
          .status(404)
          .json({ success: false, message: "Admin not found!" });
      }

      res.json({ success: true, admin: admin });
    } else {
      res.status(403).json({ success: false, message: "Invalid token!" });
    }
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  statusApprove,
  statusCancel,
  logOut,
  CheckAuth,
};
