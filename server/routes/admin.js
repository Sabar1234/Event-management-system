const express = require("express");
const {
  adminSignup,
  adminLogin,
  statusApprove,
  statusCancel,
  logOut,
} = require("../controllers/admin");

const router = express.Router();

router
  .post("/admin-signup", adminSignup)
  .post("/admin-login", adminLogin)
  .get("/admin-logout", logOut)
  .put("/approve-event/:eventId", statusApprove)
  .put("/cancel-event/:eventId", statusCancel);

module.exports = router;
