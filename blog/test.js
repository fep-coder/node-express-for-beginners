const mongoose = require("mongoose");

const Post = require("./models/Post");

mongoose.connect("mongodb://localhost/blog");

// Post.create(
//     {
//         title: "Post 2",
//         body: "Second post text",
//     },
//     (error, post) => {
//         console.log(error, post);
//     }
// );

// Post.find({}, (error, post) => {
//     console.log(error, post);
// });

// Post.find({title: "Post 1"}, (error, post) => {
//     console.log(error, post);
// });

// Post.find({title: /post/i}, (error, post) => {
//     console.log(error, post);
// });

const id = "622f0acda0eede8416f3fdbd";
// Post.findById(id, (error, post) => {
//     console.log(error, post);
// });

// Post.findByIdAndUpdate(
//     id,
//     {
//         title: "Updated title",
//     },
//     (error, post) => {
//         console.log(error, post);
//     }
// );

Post.findByIdAndDelete(id, (error, post) => {
    console.log(error, post);
});
