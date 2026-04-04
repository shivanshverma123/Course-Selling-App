const path = require("path");
const courseModel = require("../models/course.model");

async function newCourseLaunch(req, res) {
  let { title, description, price, details } = req.body;
  details = JSON.parse(details);
  details = details.map((det) => {
    return {
      ...det,
      topicDetails: det?.topicDetails?.split(",").map((mapDet) => {
        if (mapDet) {
          let trimmedString = mapDet.trim();
          let formattedString =
            trimmedString.charAt(0).toUpperCase() +
            trimmedString.slice(1).toLowerCase();
          return formattedString;
        }
      }),
    };
  });
  console.log(details);

  let thumbnail = req.thumbnailName;

  try {
    await courseModel.create({
      title,
      price,
      description,
      thumbnail,
      details,
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
