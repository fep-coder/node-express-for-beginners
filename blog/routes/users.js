const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

const redirectIfAuthenticatedMiddleware = require("../middleware/redirectIfAuthenticatedMiddleware");

router.get("/register", redirectIfAuthenticatedMiddleware, (req, res) => {
    res.render("register", { errors: req.flash("validationErrors") });
});

router.post(
    "/register",
    redirectIfAuthenticatedMiddleware,
    async (req, res) => {
        try {
            await User.create(req.body);
        } catch (error) {
            const validationErrors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
            console.log(validationErrors);
            req.flash("validationErrors", validationErrors);
            res.redirect("/users/register");
        }
    }
);

router.get("/login", redirectIfAuthenticatedMiddleware, (req, res) => {
    res.render("login");
});

router.post("/login", redirectIfAuthenticatedMiddleware, async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
        bcrypt.compare(password, user.password, (error, match) => {
            if (match) {
                req.session.userId = user._id;
                req.app.locals.loggedIn = true;
                res.redirect("/");
            } else {
                res.redirect("/users/login");
            }
        });
    } else {
        res.redirect("/users/login");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        req.app.locals.loggedIn = false;
        res.redirect("/");
    });
});

module.exports = router;
