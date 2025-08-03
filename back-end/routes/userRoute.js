const express = require("express");
const { registerUser, logUser} = require("../controllers/userController");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",logUser);

module.exports = router;