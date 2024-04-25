const express = require("express");
const {
  adminSignup,
  adminLogin,
  statusApprove,
  statusCancel,
  logOut,
  CheckAuth,
} = require("../controllers/admin");
const { CheckAdminAuth } = require("../middleware/adminAuth");

const router = express.Router();

router
  .post("/admin-signup", adminSignup)
  .post("/admin-login", adminLogin)
  .get("/admin-logout", CheckAuth, logOut)
  .put("/approve-event/:eventId", CheckAdminAuth, statusApprove)
  .get("/authenticate", CheckAuth)
  .put("/cancel-event/:eventId", CheckAdminAuth, statusCancel);

module.exports = router;
