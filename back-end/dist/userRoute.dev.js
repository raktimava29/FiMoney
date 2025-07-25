"use strict";

var express = require("express");

var _require = require("./userController"),
    registerUser = _require.registerUser,
    authUser = _require.authUser;

var router = express.Router();
router.route("/").post(registerUser);
router.post("/login", authUser);
module.exports = router;