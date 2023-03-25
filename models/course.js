const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:String,
    description:String,
    link:String,
    teacher:{type:Schema.Types.ObjectId,ref:'user'}
});

const course = mongoose.model('Course',courseSchema);
module.exports = course;
