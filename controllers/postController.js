const Post = require("../models/Post");


const create = async(entry) => {
    const entry1 = new Post(entry);
    const entry_ = await entry1.save();
    return entry_;
}

const findPosts = async() =>{
    let instance = await Post.find({});
    return instance;
}

const findPostById = async(id) => {
    let instance = await Post.findOne({_id : id});
    if(!instance){
        return 1;
    }
    else{
        return instance;
    }
}

const update = async(_id, data) => {
    const instance = await Post.updateOne({_id}, data);
    return instance;
}

const delete_ = async (_id) => {
    const instance = await Post.deleteOne({_id});
}


exports.create = create;
exports.findPosts = findPosts;
exports.findPostById = findPostById;
exports.update = update;
exports.delete_ = delete_;