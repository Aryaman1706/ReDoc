const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const mammoth = require("mammoth");

const { Doc } = require("../models/docs");
const { User } = require("../models/users");

// middleware
const auth = require("../middleware/auth");

// functions
const isAuthorized = require("../functions/isAuthorized");
const alreadyExists = require("../functions/alreadyExists");

const router = express.Router();

// * Get a specific doc
// * Done
router.get("/:id", auth, async (req, res) => {
  try {
    const doc = await Doc.findOne({ _id: req.params.id, authors: req.user._id })
      .populate("authors", "name, email")
      .exec();
    if (!doc) return res.status(404).send("No doc found");

    const filePath = path.resolve(
      __dirname,
      `../client/public/uploads/${doc.body}`
    );

    const result = await mammoth.convertToHtml({ path: filePath });

    res.json({ doc ,html: result.value, messages: result.messages });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
});

// * Get a specific doc body
// *
router.get("/body/:id", auth, async (req, res) => {
  const doc = await Doc.findById(req.params.id);
  if ((await isAuthorized(doc, req.user)) === true) {
    fs.readFile(
      path.join(__dirname, "../client/public", doc.body),
      "utf8",
      function (err, data) {
        res.json({ text: data, title: doc.title, authorsList: doc.authors });
      }
    );
  } else {
    res.send("You are not authorized");
  }
});

// edit specific doc
router.put("/:id", auth, async (req, res) => {
  let doc = await Doc.findById(req.params.id);
  if ((await isAuthorized(doc, req.user)) === true) {
    doc = await Doc.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: moment().format("lll"),
      },
      { new: true }
    );
    if (req.body.text) {
      fs.writeFile(
        path.join(__dirname, "../client/public/", doc.body),
        req.body.text
      );
    }
    doc = await doc.save();
    res.send(doc);
  } else {
    res.send("You are not authorized");
  }
});

// delete a particular doc
router.delete("/:id", auth, async (req, res) => {
  let doc = await Doc.findById(req.params.id);
  if ((await isAuthorized(doc, req.user)) === true) {
    doc = await Doc.findByIdAndRemove(req.params.id);
    fs.unlink(path.join(__dirname, "../client/public", doc.body), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.send(doc);
  } else {
    res.send("You are not authorized");
  }
});

// * Add authors
// *
router.put("/addAuthor/:id", auth, async (req, res) => {});

// * Remove author from doc
// *
router.put("/removeAuthor/:id", auth, async (req, res) => {});

// ---END---
module.exports = router;
