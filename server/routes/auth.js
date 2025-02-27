const express = require("express");

const login = require("../controllers/login.js");
const createUser = require("../controllers/signup.js");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });

});
module.exports = router;