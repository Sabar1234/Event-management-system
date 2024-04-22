const {
  registerUser,
  verifyOtp,
  loginUser,
  logOutUser,
  getAllUsers,
} = require("../controllers/user");

const router = require("express").Router();

router
  .post("/sign-up", registerUser)
  .post("/verify-otp", verifyOtp)
  .post("/login", loginUser)
  .get("/logout", logOutUser)
  .get("/users", getAllUsers);

module.exports = router;
