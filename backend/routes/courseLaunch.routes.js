const launchCourseRouter = require("express").Router();
const newCourseLaunch = require("../controllers/courseLaunch.ctrl");
const upload = require("../middlewares/thumbnailUpload.mdw");

launchCourseRouter.post(
  "/create-new-course",
  upload.fields([
    {
      name: "thumbnailFile",
      maxCount: 1,
    },
    {
      name: "instructorDp",
      maxCount: 10,
    },
  ]),
  newCourseLaunch,
);

module.exports = launchCourseRouter;
