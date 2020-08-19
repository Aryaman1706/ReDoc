const { User } = require("../models/users");

module.exports = async function (req, res, next) {
  const user = await User.findById(req.user._id).exec();

  if (user.docs.includes(req.params.id)) {
    console.log("Can Read Doc.");
    next();
  } else {
    res.status(400).send("You are not authorized.");
  }
};
