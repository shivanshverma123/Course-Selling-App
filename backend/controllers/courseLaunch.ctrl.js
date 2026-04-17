const path = require("path");
const courseModel = require("../models/course.model");

async function newCourseLaunch(req, res) {
  let { title, description, price, details } = req.body;
  details = JSON.parse(details);
  // details = details.map((det) => {
  //   return {
  //     ...det,
  //     topicDetails: det?.topicDetails?.split(",").map((mapDet) => {
  //       if (mapDet) {
  //         let trimmedString = mapDet.trim();
  //         let formattedString =
  //           trimmedString.charAt(0).toUpperCase() +
  //           trimmedString.slice(1).toLowerCase();
  //         return formattedString;
  //       }
  //     }),
  //   };
  // });
  // console.log(details);
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
      let temp = {
        topic: det.topic,
        description: det.topicDetails,
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
