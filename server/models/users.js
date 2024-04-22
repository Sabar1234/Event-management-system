const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    otp: String,
    isVerified: { type: Boolean, default: false },
    token: String,
    userEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
  },
  
  { timestamps: true }
);

const Users = new mongoose.model("Users", userSchema);
module.exports = Users;
