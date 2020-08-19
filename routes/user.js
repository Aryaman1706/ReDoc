const express = require("express");
const path = require("path");
const fs = require("fs");

// * NPM packages
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const mammoth = require("mammoth");

// * Models
const { User } = require("../models/users");
const { Doc } = require("../models/docs");

// * Middleware
const auth = require("../middleware/auth");

// * Config
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../client/public/uploads"),
  filename: function (req, file, callback) {
    callback(null, "doc_" + uuidv4() + path.extname(file.originalname));
  },
});

const uploadDoc = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("doc");

function checkFileType(file, cb) {
  // allowed format is docx and txt
  const fileTypes = /docx|txt/;
  // Check uploaded file
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid file type.");
  }
}

// ? API endpoints -->

const router = express.Router();

// *  Get my profile
// * Done
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "docs",
        model: "Doc",
        options: { sort: { dateOrg: -1 } },
      })
      .exec();
    if (!user) return res.status(404).send("user not found");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Get a specific user
// * Done
router.get("/get/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) return res.status(404).send("No such user found");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Create new user
// * Done
router.post("/", async (req, res) => {
  try {
    const validationSchema = Joi.object({
      name: Joi.string().min(5).max(250).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.password.trim() !== req.body.confirmPassword.trim())
      return res.status(400).send("Passwords do not match.");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password.trim(), salt);

    const newUser = await User.create({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: password,
      docs: [],
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Create a doc
// * Done
router.post("/create_doc", async (req, res) => {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().max(250),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const fileName = uuidv4();

    fs.createWriteStream(
      path.resolve(__dirname, `../client/public/uploads/doc_${fileName}.html`)
    );

    const doc = await Doc.create({
      title: req.body.title.trim(),
      body: `${fileName}.html`,
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { docs: doc._id },
      },
      { new: true }
    );

    res.status(200).json({ doc, user });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Upload a Doc
// * Done
router.post("/upload_doc", [auth, uploadDoc], async (req, res) => {
  try {
    const validationSchema = Joi.object({
      title: Joi.string().max(250).required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // store uploaded file as html
    var result = await mammoth.convertToHtml({
      path: path.resolve(
        __dirname,
        `../client/public/uploads/${req.file.filename}`
      ),
    });
    const htmlFileName = uuidv4();
    var htmlFile = fs.createWriteStream(
      path.resolve(__dirname, `../client/public/uploads/${htmlFileName}.html`)
    );
    await htmlFile.write(result.value);

    // delete docx file
    fs.unlink(
      path.resolve(__dirname, `../client/public/uploads/${req.file.filename}`),
      (err) => console.log(err)
    );

    const doc = await Doc.create({
      title: req.body.title.trim(),
      body: `${htmlFileName}.html`,
      authors: req.user._id,
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { docs: doc._id },
      },
      { new: true }
    );

    res.json({ doc, user });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Edit my profile
// * Done
router.put("/me", auth, async (req, res) => {
  try {
    const validationSchema = Joi.object({
      name: Joi.string().min(5).max(250).required(),
      email: Joi.email().required(),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name.trim(),
        email: req.body.email.trim(),
      },
      { new: true }
    );

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Change Password
// * Done
router.post("/change-password", async (req, res) => {
  try {
    let user = await User.findById(req.user._id).exec();

    if (req.body.password.trim() !== req.body.confirmPassword.trim())
      return res.status(400).send("Passwords do not match.");

    const result = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!result) return res.status(400).send("Old password is wrong.");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password.trim(), salt);

    user.password = password;
    user = await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send("Something went wrong.");
  }
});

// * Delete account
// * Done
router.delete("/me", auth, async (req, res) => {
  try {
    const user = User.findByIdAndRemove(req.user._id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Delete the doc id from my docs
// * Done
router.put("/editMyDocs/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { docs: req.params.id },
      },
      { new: true }
    ).exec();

    if (!user) return res.status(404).send("No user found.");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// ? API endpoints end -->

module.exports = router;
