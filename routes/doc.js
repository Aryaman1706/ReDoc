const express = require("express");
const path = require("path");
const fs = require("fs");

// * NPM packages
const Joi = require("joi");
const moment = require("moment");
const HTMLtoDOCX = require("html-to-docx");

// * Models
const { Doc } = require("../models/docs");

// * Middleware
const auth = require("../middleware/auth");
const canReadDoc = require("../middleware/canReadDoc");
const { User } = require("../models/users");

// ? API endpoints -->
const router = express.Router();

// * Get a doc
// * Done
router.get("/:id", [auth, canReadDoc], async (req, res) => {
  try {
    const doc = await Doc.findOne({ _id: req.params.id, authors: req.user._id })
      .populate("authors", "name, email")
      .exec();
    if (!doc) return res.status(404).send("No doc found");
    res.status(200).send(doc);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Get a specific doc body
// * Done
router.get("/body/:id", [auth, canReadDoc], async (req, res) => {
  try {
    const doc = await Doc.findOne({ _id: req.params.id, authors: req.user._id })
      .populate("authors", "name, email")
      .exec();
    if (!doc) return res.status(404).send("No doc found");

    fs.createReadStream(
      path.resolve(__dirname, `../client/public/uploads/${doc.body}`)
    ).pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Edit specific doc
// * Done
router.put("/:id", [auth, canReadDoc], async (req, res) => {
  let doc = await Doc.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      date: moment().format("lll"),
      dateOrg: new Date(),
    },
    { new: true }
  );
  fs.writeFile(
    path.join(__dirname, "../client/public/", doc.body),
    req.body.text.trim(),
    (error) => {
      if (error) console.log(error);
    }
  );
  doc = await doc.save();
  res.send(doc);
});

// * Add authors
// * Done
router.put("/addAuthor/:id", [auth, canReadDoc], async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.trim() }).exec();
    const doc = await Doc.findById(req.params.id).exec();
    if (!user || !doc) return res.status(400).send("Server denied request.");

    if (doc.authors.includes(user._id)) {
      // If user is already an author
      return res.status(400).send("User is already an author.");
    } else {
      // If user is not already an author
      const updatedDoc = await Doc.findByIdAndUpdate(
        req.params.id,
        {
          $push: { authors: user._id },
        },
        { new: true }
      ).exec();

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $push: { docs: doc._id },
        },
        { new: true }
      ).exec();

      if (!updatedUser || !updatedDoc)
        return res.status(400).send("Server denied request.");

      res.json({ user: updatedUser, doc: updatedDoc });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Remove author from doc
// * Done
router.put("/removeAuthor/:id", [auth, canReadDoc], async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id).exec();
    const user = await User.findOne({ email: req.body.email.trim() }).exec();
    if (!user || !doc) return res.status(400).send("No such documents exists.");

    // If only one author then delete doc
    if (doc.authors.length <= 1) {
      doc = await doc.remove();
      res.status(200).send(doc);
    } else {
      // Else remove user for doc.authors and doc from user.docs
      const updatedDoc = await Doc.findByIdAndUpdate(
        doc._id,
        {
          $pull: { authors: user._id },
        },
        { new: true }
      ).exec();

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $pull: { docs: updatedDoc._id },
        },
        { new: true }
      ).exec();

      if (!updatedDoc || !updatedUser)
        return res.status(400).send("Server denied request.");

      res.status(200).send(updatedDoc, updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Download Doc as .docx
// *
router.get("/download/:id", async (req, res) => {
  const doc = await Doc.findById(req.params.id).exec();
  if (!doc) return res.status(400).send("Server denied request.");

  var htmlCode = fs.readFileSync(
    path.resolve(__dirname, `../client/public/uploads/${doc.body}`)
  );

  let result = await HTMLtoDOCX(htmlCode.toString());

  res.setHeader(
    "Content-type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "document.docx"
  );

  res.write(result, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send("Server error");
    }
    console.log("done");
  });
  res.end();
});

// ? API endpoints end -->

module.exports = router;
