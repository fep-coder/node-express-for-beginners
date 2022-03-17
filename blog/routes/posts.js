const express = require("express");
const router = express.Router();
const path = require("path");

const Post = require("../models/Post");

router.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.render("index", { posts });
});

router.get("/post/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", { post });
});
router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/posts/create", async (req, res) => {
    const image = req.files?.image;

    if (image) {
        image.mv(path.resolve(__dirname, "public/images", image.name));
    }

    await Post.create({ ...req.body, image: image?.name ?? "noimage.png" });
    res.redirect("/");
});

module.exports = router;
