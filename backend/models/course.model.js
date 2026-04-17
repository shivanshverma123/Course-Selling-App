const db = require("mongoose");
const Schema = db.Schema;
const ObjectId = Schema.Types.ObjectId;
const path = require("path");

const instructorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dp: {
    type: String,
  },
});

const courses = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: path.join(
      __dirname,
      "..",
      "public",
      "thumbnails",
      "dummyThumbnail.jpg",
    ),
  },
  owner: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },
  instructors: {
    type: Map,
    of: instructorSchema,
  },
  details: [
    {
      topic: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const courseModel = db.model("courses", courses);

module.exports = courseModel;
