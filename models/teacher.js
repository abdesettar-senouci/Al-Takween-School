const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./course');

const teacherSchema = new Schema({
	name:{
		type:String,
		required:true,
	},
	email:String,
	password:String,
	description:String,
	courses:[{type:Schema.Types.ObjectId,ref:'Course'}]
});

const teacher = mongoose.model('Teacher',teacherSchema);
module.exports = teacher;