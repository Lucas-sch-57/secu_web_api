const Comment = require('../models/Comment');

const createComment = (comment) => {
    return Comment.create({ ...comment });
}

const getByPostId = (id) => {
    return Comment.find({ post: id }).populate('user');
}


module.exports = { createComment, getByPostId };