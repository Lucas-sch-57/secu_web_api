const Comment = require('../models/Comment');

const createComment = (comment) => {
    return Comment.create({ ...comment });
}

const getByPostId = (id) => {
    return Comment.find({ post: id }).populate('user', 'username _id');
}

const deleteComment = (id) => {
    return Comment.findByIdAndDelete(id);
}

module.exports = { createComment, getByPostId, deleteComment };