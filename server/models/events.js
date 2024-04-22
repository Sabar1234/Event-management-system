const mongoose = require("mongoose");
const { Schema, Types, model } = require("mongoose");

const eventsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    category: { type: String, required: true },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    ticket: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    description: {
      type: String,
      // min: [50, "Description should be atleast 50 characters long"],
    },
    status: {
      type: String,
      default: "PENDING",
    },
    seats: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const events = new mongoose.model("events", eventsSchema);

module.exports = events;
