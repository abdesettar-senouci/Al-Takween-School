const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	name:{
		type:String,
		required:true,
	},
	email:String,
	password:String,
});

const student = mongoose.model('Student',studentSchema);
module.exports = student;