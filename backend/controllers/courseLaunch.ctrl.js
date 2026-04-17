const path = require("path");
const courseModel = require("../models/course.model");

async function newCourseLaunch(req, res) {
  let { title, description, price, details } = req.body;
  details = JSON.parse(details);
  let duration;
  let instructors = {};
  let courseDescription = [];
  console.log("Logging req.Files:- ", req.files);
  details = details.forEach((det) => {
    if (det.duration) {
      duration = det.duration;
    } else if (det.instructors) {
      det.instructors.forEach((ins, index) => {
        instructors[ins.id] = {
          name: ins.name,
          description: ins.description,
          dp: `${req.files.instructorDp[index].originalname}`,
        };
      });
    } else if (det.id) {
      let descriptionArray = det.topicDetials.split(",").map((det) => {
        let cleanUpStr = det.trim();
        cleanUpStr =
          cleanUpStr[0].toUpperCase() + cleanUpStr.slice(1).toLowerCase();
        return cleanUpStr;
      });
      let temp = {
        topic: det.topic,
        description: descriptionArray,
      };
      courseDescription.push(temp);
    }
  });

  let thumbnail = req.thumbnailName;

  try {
    await courseModel.create({
      title,
      price,
      description,
      thumbnail,
      details: courseDescription,
      instructors,
      duration,
      owner: req.currUser.id,
    });

    res.json({
      message: "Course created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = newCourseLaunch;
