var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var coursesRouter = require("./routes/courses");
const dotenv = require("dotenv");


require("./models/db");

var app = express();
dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/courses", coursesRouter);

//let server = app.listen(3000, () => console.log("Listening on port: ", server.address().port))

module.exports = app;
