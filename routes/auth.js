const express = require("express");

// * NPM packages
const bcrypt = require("bcryptjs");

// * Models
const { User } = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  const result = await bcrypt.compare(req.body.password.trim(), user.password);
  if (!result) return res.send("Not valid...");
  const token = user.generateAuthToken();
  res.json({ token });
});

module.exports = router;
