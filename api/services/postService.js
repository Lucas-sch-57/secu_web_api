const Post = require('../models/Post');

const createPost = (post) => {
    return Post.create({ ...post });
}

const getMyPosts = (id) => {
    return Post.find({ user: id }).populate('user');
}

const getPostById = (id) => {
    return Post.findById(id).populate('user');
}

const getAllPosts = () => {
    return Post.find().populate('user');
}

const deletePostById = (id) => {
    return Post.findByIdAndDelete(id);
}

const updatePostById = (id, post) => {
    return Post.findByIdAndUpdate(id, { ...post }, { new: true }).populate('user');
}

const likePostById = (id, userId) => {
    return Post.findByIdAndUpdate(id, { $push: { likes: userId } }, { new: true });
}


module.exports = { createPost, getPostById, getAllPosts, deletePostById, updatePostById, getMyPosts, likePostById };