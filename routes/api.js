const express = require("express");
const router = express.Router();
const path = require("path");
const BlogPost = require("../models/BlogPost");
const multer = require("multer");
var fs = require("fs");

//whole multer setup!
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //check the ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error: Images only!");
  }
}

//upload init
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//This is working totally fine!
router.get("/", (req, res) => {
  BlogPost.find()
    .then((data) => {
      console.log("from axios yay!");
      res.json(data);
    })
    .catch((err) => {
      console.log("error :", err);
    });
});

router.post("/save", upload.single("img"), (req, res, next) => {
  const data = {
    body: req.body.data,
    img: {
      // data:
      //   req.file.fieldname + Date.now() + path.extname(req.file.originalname),
      // data: fs.readFileSync(
      //   path.join(__dirname + "/../uploads/" + req.file.filename)
      // ),

      //more easy way is here!
      data: fs.readFileSync(req.file.path),

      contentType: "image/png",
    },
  };

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((err, val) => {
    if (err) {
      res.status(500).json({ msg: "Sorry, The data couldn't be saved" });
      console.log("Reached the save errors! BLOGPOST", newBlogPost);
      return;
    }
    console.log("printing the req here: ", val);
    res.json(val);
  });
});

module.exports = router;
