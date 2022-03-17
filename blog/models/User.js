const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username: String,
    password: String,
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
