const launchCourseRouter = require("express").Router();
const newCourseLaunch = require("../controllers/courseLaunch.ctrl");
const upload = require("../middlewares/thumbnailUpload.mdw");

launchCourseRouter.post("/create-new-course", upload.single("file"),newCourseLaunch);

module.exports = launchCourseRouter;
