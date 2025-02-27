const User = require("../schema/User.js");
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../utils/generateToken.js");

env.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json({ message: "All fields are required!" });
  }
  const user = await User.findOne({ email });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    // domain: "http://localhost:3000/",
    domain: process.env.FRONTEND_URL,
    path: "/",
    expires: new Date(Date.now() + 86400000),
    httpOnly: true,
    secure: true,
    // sameSite: "None",
  });
  res.json({ token, user });
};

module.exports = login;
