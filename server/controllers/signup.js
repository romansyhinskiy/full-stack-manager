const User = require("../schema/User.js");

const { createSecretToken } = require("../utils/generateToken.js");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.name &&
        req.body.username
      )
    ) {
      return res.status(400).json({ message: "All inputs are required!" });
    }
    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createSecretToken(user.id);

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      // sameSite: "None"
    });

    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Got an error", error);
  }
};
module.exports = createUser;
