const express = require("express");
const { registerUser, logUser} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login",logUser);

module.exports = router;