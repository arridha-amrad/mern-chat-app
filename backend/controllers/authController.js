const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenHandler");

const signup = async (req, res) => {
  const { name, email, password, pics } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      pic: pics,
    });
    const token = await generateToken(newUser.id);
    return res.status(200).json({ user: newUser, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await generateToken(user.id);
        return res.status(200).json({ user, token });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

module.exports = { signup, login };
