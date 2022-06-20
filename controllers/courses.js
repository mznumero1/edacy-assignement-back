const mongoose = require("mongoose");

const escapeStringRegexp = require("escape-string-regexp");

require("../models/courses");

const Course = mongoose.model("Course");



const publish = (req, res) => {
    if (
        req.body.title &&
        req.body.subject &&
        req.body.language &&
        req.body.videoUrl
        ) {
        const course = new Course();
        course.title = req.body.title;
        course.subject = req.body.subject;
        course.level = req.body.level;
        course.country = req.body.country;
        course.description = req.body.description;
        course.language = req.body.language;
        course.thumbnailUrl = req.body.thumbnailUrl;
        course.videoUrl = req.body.videoUrl;
        course.owner = userId;
        course.save(function(err, c){
            if (err) {
                res.status(400).send({
                    message: "Course Publishing error",
                    error: err
                });
            }
            else {
                delete c.videoUrl;
                res.json(c);
            }
        });
    } else {
        return res.status(400).json({ message: "Title, Subject, Language and Video are required." });
    }
};

const findById = (req, res) => {
    const id = req.params.id;
    Course.findById(id, function(err, course){
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        } else {
            if (course) {
                return res.json(course);
            } else {
                return res.status(404).json({
                    message: "Course not found",
                    data: course
                });
            }
        }
    });
};

/*eslint complexity: ["error", 10]*/
const find = (req, res) => {
    let text = req.query.query || req.body.query;
    const skip = req.query.skip || req.body.skip || 0;
    const limit = req.query.limit || req.body.limit || 4;
    if (text) {
        text = escapeStringRegexp(text);
        /*eslint-disable */
        text = new RegExp(text, "i");
        /*eslint-enable */
    }
    let query = Course.find();
    if (text) {
        query = query.or([
            {title: { $regex: text }},
            {level: { $regex: text }},
            {country: { $regex: text }},
            {subject: { $regex: text }},
            {description: { $regex: text }}
        ]);
    }
    query
        .skip(Number(skip))
        .limit(Number(limit))
        .sort({updatedAt: -1})
        .exec(function(err, courses){
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err
                });
            } else {
                return res.json(courses);
            }
        });
};

module.exports = {
    publish,
    find,
    findById
};
