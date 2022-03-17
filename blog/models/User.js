const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, (error, hash) => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
