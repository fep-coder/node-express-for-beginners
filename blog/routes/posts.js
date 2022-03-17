const express = require("express");
const router = express.Router();
const path = require("path");

const Post = require("../models/Post");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const posts = await Post.find({}).populate("userid");
    console.log(req.session);
    res.render("index", { posts });
});

router.get("/post/:id", async (req, res) => {
    const post = await Post.findById(req.params.id).populate("userid");
    res.render("post", { post });
});
router.get("/create", authMiddleware, (req, res) => {
    return res.render("create", { createPost: true });
});

router.post("/posts/create", async (req, res) => {
    const image = req.files?.image;

    if (image) {
        image.mv(path.resolve(__dirname, "../public/images", image.name));
    }

    await Post.create({
        ...req.body,
        image: image?.name ?? "noimage.png",
        userid: req.session.userId,
    });

    res.redirect("/");
});

module.exports = router;
