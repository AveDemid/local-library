require("dotenv").config();
const path = require("path");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");

const indexRouter = require("./routes/index");
const catalogBookRouter = require("./routes/catalog/book");
const catalogBookinstanceRouter = require("./routes/catalog/bookinstance");
const catalogAuthorRouter = require("./routes/catalog/author");
const catalogGenreRouter = require("./routes/catalog/genre.js");

const app = express();

// // MongoDB
const mongose = require("mongoose");

mongose.connect(process.env.DB_CONN, { useNewUrlParser: true });

const db = mongose.connection;
db.on("error", console.error.bind(console, "Mongose connection error:"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", catalogBookRouter);
app.use("/catalog", catalogBookinstanceRouter);
app.use("/catalog", catalogAuthorRouter);
app.use("/catalog", catalogGenreRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
