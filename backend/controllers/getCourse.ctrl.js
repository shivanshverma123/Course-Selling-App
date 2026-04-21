const courseModel = require("../models/course.model");

async function getAllCourses(req, res) {
  let userRole = req.currUser.userType;
  let response;
  try {
    if (userRole === "admin") {
      response = await courseModel.find({
        owner: req.currUser.id,
      });
    } else {
      response = await courseModel.find({});
    }

    return res.json({
      message: "Course Retreived Successfully",
      courses: response,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = getAllCourses;
