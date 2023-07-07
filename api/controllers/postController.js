const { createPost, getPostById, getAllPosts, deletePostById, getMyPosts, updatePostById, likePostById } = require('../services/postService');

const create = (req, res) => {
    const { title, content } = req.body;
    createPost({ title, content, user: req.user.id })
        .then(post => res.status(201).json({ post }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const all = (req, res) => {
    getAllPosts()
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const myPosts = (req, res) => {
    getMyPosts(req.user.id)
        .then(posts => res.status(200).json({ posts }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const one = (req, res) => {
    getPostById(req.params.id)
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const update = (req, res) => {
    updatePostById(req.params.id, req.body)
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const like = async (req, res) => {
    const postQuery = getPostById(req.params.id);
    let post = null
    await postQuery.then(p => post = p);
    if (post.likes.includes(req.user.id)) {
        return res.status(400).json({ message: 'You have already liked this post' });
    }
    likePostById(req.params.id, req.user.id)
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(500).json({ message: error.message }));
}

const deleteOne = (req, res) => {
    deletePostById(req.params.id)
        .then(post => res.status(200).json(post.id))
        .catch(error => res.status(500).json({ message: error.message }));
}



module.exports = { create, all, myPosts, one, update, like, deleteOne };