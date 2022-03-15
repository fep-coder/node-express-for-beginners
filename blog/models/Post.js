const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date(),
    },
    image: {
        type: String,
        default: "noimage.png"
    }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
