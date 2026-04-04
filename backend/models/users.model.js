const db = require("mongoose");
const Schema = db.Schema;
const ObjectId = Schema.Types.ObjectId;

const { courses } = require("./course.model");

const users = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  userType: {
    type: String,
    default: "user",
  },
  courses: {
    type: ObjectId,
    ref: "courses",
  },
});

const userModel = db.model("users", users);

module.exports = userModel;
