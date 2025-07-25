"use strict";

var express = require("express");

var _require = require("../controllers/userController"),
    registerUser = _require.registerUser,
    logUser = _require.logUser;

var router = express.Router();
router.route("/register").post(registerUser);
router.post("/login", logUser);
module.exports = router;