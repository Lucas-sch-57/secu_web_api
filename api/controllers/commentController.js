const { createComment, getByPostId, deleteComment } = require('../services/commentService');

const create = (req, res) => {
    const { content, post } = req.body;
    createComment({ content, post, user: req.user.id })
        .then(comment => res.status(201).json({ comment }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const getbypost = (req, res) => {
    getByPostId(req.params.id)
        .then(comments => res.status(200).json({ comments }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const deleteOne = (req, res) => {
    deleteComment(req.params.id)
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(500).json({ message: error.message }));
}

module.exports = { create, getbypost, deleteOne };