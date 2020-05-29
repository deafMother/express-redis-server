const express = require("express");
const app = express();
const noteRoute = require("./routes/noteRoute");

app.use("/", noteRoute);

module.exports = app;
