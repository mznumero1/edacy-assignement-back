var express = require("express");
var router = new express.Router();
const ctrlCourses = require("../controllers/courses");

/* GET users listing. */
router.get("/:id/", ctrlCourses.findById);
router.post("/", ctrlCourses.publish);
router.get("/", ctrlCourses.find);

module.exports = router;
