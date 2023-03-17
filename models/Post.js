const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        reuired : true
    },
    desc : {
        type : String,
        reuired : true
    },
    comments : {
        type : Array,
        required : true
    },
    likes : {
        type : Number
    },
    created_at : {
        type : Number
    }
})


const Post = mongoose.model("Post", PostSchema);
module.exports = Post;