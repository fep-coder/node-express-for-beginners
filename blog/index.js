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
    const image = req.files?.image;

    if (image) {
        image.mv(path.resolve(__dirname, "public/images", image.name));
    }

    await Post.create({ ...req.body, image: image?.name ?? "noimage.png" });
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
