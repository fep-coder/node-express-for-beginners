const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    try {
        await User.create(req.body);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});

module.exports = router;
