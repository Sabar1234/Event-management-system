const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    token: String,
    // userEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
  },

  { timestamps: true }
);

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
