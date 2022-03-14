const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("pages/index.html", { root: "public" });
});

app.get("/about", (req, res) => {
    res.sendFile("pages/about.html", { root: "public" });
});

app.get("/contact", (req, res) => {
    res.sendFile("pages/contact.html", { root: "public" });
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
