const express = require("express");
const router = express.Router();

const BlogPost = require("../models/BlogPost");

router.get("/", (req, res) => {
  BlogPost.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("error :", err);
    });
});

router.post("/save", (req, res) => {
  const data = req.body;
  const newBlogPost = new BlogPost(data);
  newBlogPost.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry, The data is couldn't be saved" });
      return;
    }
    return res.json("Data just got saved");
  });
});

module.exports = router;
