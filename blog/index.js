const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/blog");

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
