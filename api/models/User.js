//user model for mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
});

module.exports = mongoose.model('User', UserSchema);