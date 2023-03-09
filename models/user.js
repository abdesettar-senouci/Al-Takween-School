const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email:String,
    name: String,
    role: String,
    created: Date,
});

const User = mongoose.model('user', userSchema);

module.exports = User;