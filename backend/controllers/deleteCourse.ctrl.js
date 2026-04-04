const courseModel = require("../models/course.model");
const getAllCourses = require("./getCourse.ctrl");

async function deleteCourse(req, res) {
  let courseId = req.params.id;

  try {
    await courseModel.deleteOne({ _id: courseId });
    getAllCourses(req, res);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server Error",
      error: err,
    });
  }
}

module.exports = deleteCourse;
