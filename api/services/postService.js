const Post = require('../models/Post');

const createPost = (post) => {
    return Post.create({ ...post });
}

const getMyPosts = (id) => {
    return Post.find({ user: id });
}

const getPostById = (id) => {
    return Post.findById(id);
}

const getAllPosts = () => {
    return Post.find();
}

const deletePostById = (id) => {
    return Post.findByIdAndDelete(id);
}

const updatePostById = (id, post) => {
    return Post.findByIdAndUpdate(id, { ...post }, { new: true });
}

const likePostById = (id, userId) => {
    return Post.findByIdAndUpdate(id, { $push: { likes: userId } }, { new: true });
}


module.exports = { createPost, getPostById, getAllPosts, deletePostById, updatePostById, getMyPosts, likePostById };