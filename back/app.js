var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
var indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
var authRouter = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");
const ensureGuest = require("./middleware/auth");

const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
require("./config/passport")(passport);

require("./models/user");
var app = express();
mongoose.set("strictQuery", true);

//Sessions middleware
app.use(
  session({
    secret: process.env.Session_Middleware_Secret,
    resave: false,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(session({ secret: process.env.Session_Middleware_Secret }));
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT;

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", "views"); // set the views directory
app.set("view engine", "twig"); // set the view engine

//Swagger API
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const endpointsFiles = ["./routes/index.js", "./routes/userRoutes.js"];
const doc = {
  host: "127.0.0.1:5000",
};
swaggerAutogen(outputFile, endpointsFiles, doc);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(userRoutes);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.get("/verify-email/:token", function (req, res) {
  res.render("verification");
});
app.use(function (req, res, next) {
  next(createError(404));
});

//port connections

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

//database connection
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
