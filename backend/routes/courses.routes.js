const getCourseRouter = require("express").Router();
const getAllCourses = require("../controllers/getCourse.ctrl");
const deleteCourse = require("../controllers/deleteCourse.ctrl");

getCourseRouter.get("/getAllCourse/", getAllCourses);

// getCourseRouter.get("/getCourse/:id");

getCourseRouter.delete("/deleteCourse/:id", deleteCourse, getAllCourses);

module.exports = getCourseRouter;
