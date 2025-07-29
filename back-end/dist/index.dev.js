"use strict";

var express = require('express');

var _require = require('./config/error'),
    notFound = _require.notFound,
    errorHandler = _require.errorHandler;

var dotenv = require('dotenv');

var connectDB = require('./config/db');

var userRoutes = require('./routes/userRoute');

var productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();
var app = express();
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/pro', productRoutes);
app.get("/", function (req, res) {
  res.send("APP is running");
});
app.use(notFound);
app.use(errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', function () {
  return console.log("Server Started on PORT ".concat(PORT));
});