const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    link:String,
})

const course = mongoose.model('Course',courseSchema);
module.exports = course;
