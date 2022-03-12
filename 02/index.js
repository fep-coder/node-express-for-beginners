const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    // res.json({
    //     course: "Node for beginners",
    // });
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

app.listen(3000, console.log("Listening on port 3000"));
