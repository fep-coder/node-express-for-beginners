const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost/blog");

const Post = require("./models/Post");

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);
    res.render("index", { posts });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/posts/create", (req, res) => {
    res.render("create");
});

app.post("/posts/create", async (req, res) => {
    await Post.create(req.body);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
