const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title:String,
    description:String,
    img:String,
    category:String,//should be enum
    type: {
        type: String,
        enum: ['on site','online'],
    },
    price:Number,
    hours:Number,
    certificate:Boolean,
    subscribe:Boolean,
    students:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'student'
        }] , 
    },
    waitlist:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Student'
        }] ,
    },
    teacher:{ type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
});

const course = mongoose.model('Course',courseSchema);
module.exports = course;
