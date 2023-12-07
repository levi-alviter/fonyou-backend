const express = require("express");
const bodyParser = require("body-parser");

const HttpError = require("./models/http-error");

const charactersRoutes = require("./routes/characters-router");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/characters", charactersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Route not found", 404);
  throw new error();
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ error: error.message || "An unknown error occurred" });
});

app.listen(process.env.PORT || 5000);
