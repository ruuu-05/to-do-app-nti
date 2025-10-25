const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretkey");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  signup,
  login,
};
