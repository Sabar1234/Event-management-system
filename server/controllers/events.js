require("dotenv").config();
const events = require("../models/events");
const Users = require("../models/users");
const nodemailer = require("nodemailer")


const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
});
// creating an event-
const createEvent = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      description,
      location,
      image,
      category,
      ticket,
      seats,
    } = req.body;
    if (
      !title ||
      !startDate ||
      !endDate ||
      !description ||
      !location ||
      !category ||
      !image ||
      !ticket ||
      !seats
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const { creatorId } = req.body;
    console.log("creator", creatorId);
    const newEvent = await events.create({
      title,
      startDate,
      endDate,
      creator: creatorId,
      description,
      category,
      image,
      location,
      ticket,
      seats,
    });

    // Updating the user's userEvents array with the new event's ID
    await Users.findByIdAndUpdate(
      creatorId,
      { $push: { userEvents: newEvent._id } }, // Push the new event's ID to userEvents array
      { new: true }
    );

    return res
      .status(201)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// showing user's details for each event-
const userInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const eventsListedByUser = await events
      .find({ creator: userId })
      .populate("creator");

    return res.status(200).json(eventsListedByUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
//getting events of a particular user//
const userEvents = async (req, res) => {
  const { userId } = req.params;
  // console.log("User id of fetched-event", userId);

  try {
    const userEvents = await events.find({ creator: userId });

    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      userEvents: userEvents,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message, success: false });
  }
};

// get all events -
const getAllEvents = async (req, res) => {
  try {
    const eventData = await events.find();
    //console.log(eventData);
    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events: eventData,
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send({ message: "Error in Fetching data", error: e.message });
  }
};

//get single event//
const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    // console.log("Single eventId", eventId);
    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide your event ID" });
    }
    const eventData = await events
      .findOne({ _id: eventId })
      .populate("creator");
    return res.status(200).json({
      success: true,
      message: "Event fetched succefully",
      event: eventData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

// update event-
const updateEvent = async (req, res) => {
  try {
    const { eventId, creatorEmail } = req.params;
    console.log("CreatorEmail", creatorEmail);
    console.log("EventId", eventId);

    if (!creatorEmail) {
      res
        .status(400)
        .json({ success: false, message: "Please provise your email" });
    }

    if (!eventId) {
      res
        .status(400)
        .json({ success: false, message: "Please provise your event ID" });
    }

    const { title, descrtption, startDate, ticket, endDate, location, image } =
      req.body;

    let updatedEvent = await events.findByIdAndUpdate(
      eventId,
      {
        $set: {
          title,
          descrtption,
          startDate,
          ticket,
          endDate,
          location,
          image,
        },
      },

      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      res
        .status(400)
        .json({ success: false, message: "Failed to update the event" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};

// delteEvent-
const deleteEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    console.log("Deleted EventId", eventId);
    console.log("Deleted event User's Id", userId);

    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Please login to delete event" });
    }

    if (!eventId) {
      res
        .status(400)
        .json({ success: false, message: "Please provise your event ID" });
    }
    const deletedEvent = await events.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      res
        .status(400)
        .json({ success: false, message: "Failed to update the event" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};

//Event Booked API//
const booknow = async(req,res)=>{
  const {eventId} = req.params
  const {username,useremail,number,ticket} = req.body
  try {
    const event = await events.findById(eventId)
    if(!event){
      return res.status(404).json({
        success:false,
        message:"Event not found"
      })
    }
    const info = {
      from: process.env.EMAIL,
      to: useremail,
      subject: "Hurray Event Booked Successfully",
      html:`<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          color: #555;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .info {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
        .info p {
          margin: 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
        }
      </style>
      </head>
      <body>
        <div class="container">
          <h1>Booking Confirmation</h1>
          <p>Hello <strong>${ username }</strong>,</p>
          <p>We are pleased to inform you that your booking for the event has been confirmed successfully.</p>
          <div class="info">
            <p><strong>Amount of Tickets:</strong>₹ ${ ticket }</p>
            <p><strong>Contact Number:</strong> ${ number }</p>
          </div>
          <p>Thank you for choosing our event. We look forward to seeing you there!</p>
          <div class="footer">
            <p>Best regards,<br>Event Management Team</p>
          </div>
        </div>
      </body>
      </html>
      `,
    };


    await transport.sendMail(info);

    res.status(201).json({
      success: true,
      message: "Booked",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}
module.exports = {
  createEvent,
  userInfo,
  getAllEvents,
  updateEvent,
  deleteEvent,
  userEvents,
  getSingleEvent,
  booknow
};
