const express = require("express");
const connectDb = require("./db/db");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const eventsRoutes = require("./routes/events");
const adminRoutes = require("./routes/admin");
const cors = require("cors");

connectDb();

app.use(
  cors({
    origin: true, //"http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api", adminRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Running on ${port}`));
