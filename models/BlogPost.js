const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//creating the schema here
const BlogPostSchema = new Schema({
  body: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

//model
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
