const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	username: String,
    googleId: String,
    email:String,
	name:String,
	membership:String,
	membershipDate:Date,
	authZ:String,
});

const student = mongoose.model('Student',studentSchema);
module.exports = student;