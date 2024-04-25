const express = require("express");
const isAuthenticated = require("../middleware/auth");
const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  userInfo,
  userEvents,
  getSingleEvent,
  booknow,
} = require("../controllers/events");

const router = express.Router();

router
  .post("/new", isAuthenticated, createEvent)
  .get("/user-info/:userId", isAuthenticated, userInfo)
  .get("/events", isAuthenticated, getAllEvents)
  .get("/event/:eventId", isAuthenticated, getSingleEvent)
  .get("/user-events/:userId", isAuthenticated, userEvents)
  .put("/update-event/:eventId/:creatorEmail", isAuthenticated, updateEvent)
  .delete("/delete-event/:eventId/:userId", isAuthenticated, deleteEvent)
  .post("/booknow/:eventId", isAuthenticated, booknow);

module.exports = router;
