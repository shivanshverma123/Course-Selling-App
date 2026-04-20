const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const launchCourseRouter = require("./routes/courseLaunch.routes");
const getCourseRouter = require("./routes/courses.routes");
const authenticate = require("./middlewares/auth.mdw");
const connectDb = require("./db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(authenticate);

connectDb();

app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "public", "thumbnails")),
);
app.use("/auth", authRouter);
app.use("/api", launchCourseRouter);
app.use("/api", getCourseRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
