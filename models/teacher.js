const mongoose = require('mongoose');
const Schema = mongoose.schema;

const teacherSchema = new schema({
	name:String,
	firstname:String,
	email:String,
	username:String,
	password:String
});
