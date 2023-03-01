var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
var indexRouter = require("./routes/index");
const mongoose = require("mongoose");

require("dotenv").config();
require("./models/user");


var app = express();

mongoose.set("strictQuery", true);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json(err.message);
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database " + process.env.MONGO_URI);
  })
  .catch((err) => {
    console.log(err.message);
  });
