var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const db = require("./models");
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

async function dbConnector() {
  // Connecting the Database
  let err = await db.sequelize.authenticate();
  if (err) {
    console.error("failed to connect to DB");
    console.error("ERROR: " + err);
  } else {
    console.log("Environment - " + process.env.NODE_ENV);

    console.log("Database connected to " + config.host + ":" + config.port);
  }
}

dbConnector();

module.exports = app;
