const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email:String,
    name: String,
    role: String,
    description:String,
    courses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'course'
        }] , 
    },
    created: Date,
});

const User = mongoose.model('user', userSchema);
module.exports = User;