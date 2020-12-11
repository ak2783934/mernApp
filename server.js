//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./routes/api");
const BlogPost = require("./models/BlogPost");

const codedPath =
  "mongodb+srv://ak2783934:Avinash@cluster0.goarw.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(codedPath || "mongodb://localhost/mernApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!"); //just for checking if the routes are connected or not bro!
});

//cors for cross transfer of urls. only after just adding this, things start working like fooo!
// app.use(cors());

//similarly we are not getting any body parsed into the request, so we just pass the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//HTTP logger is used here
app.use(morgan("tiny"));
//routes
app.use("/api", routes);

//checking where the application is running

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//listening here
app.listen(PORT, console.log(`Server is starting at port ${PORT}`));
