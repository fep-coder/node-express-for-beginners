const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

mongoose.connect("mongodb://localhost/blog");

const Post = require("./models/Post");

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());

const validateMiddleware = (req, res, next) => {
    if (req.body.title == "" || req.body.body == "") {
        return res.redirect("/posts/create");
    }
    next();
};
app.use("/posts/create", validateMiddleware);

const posts = require("./routes/posts");

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.use("/", posts);

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
