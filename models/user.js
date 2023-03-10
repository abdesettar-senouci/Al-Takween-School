const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email:String,
    name: String,
    role: String,
    description:String,
    courses:[{type:Schema.Types.ObjectId,ref:'Course'}],
    created: Date,
});

const User = mongoose.model('user', userSchema);

module.exports = User;