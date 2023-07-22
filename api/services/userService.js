const User = require('../models/User');
const getUserByUsername = (username) => {
    return User.findOne({ username });
}

const createUser = (user) => {
    return User.create({ ...user });
}

const getUserById = (id) => {
    return User.findById(id);
}

const updateUser = (id, user) => {
    return User.findByIdAndUpdate(id, user, { new: true });
}

module.exports = { getUserByUsername, createUser, getUserById, updateUser };