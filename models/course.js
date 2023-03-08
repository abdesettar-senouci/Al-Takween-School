const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    link:String,
    description:String,
    teacher:{type:Schema.Types.ObjectId,ref:'Teacher'}
});

const course = mongoose.model('Course',courseSchema);
module.exports = course;
