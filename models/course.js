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
    students:Array,//{
    //     type : [{
    //         type : Schema.Types.ObjectId , 
    //         ref: 'student'
    //     }] , 
    // },
    waitlist:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'student'
        }] , 
    },
    teacher:String//{type:Schema.Types.ObjectId,ref:'user'}
});

const course = mongoose.model('Course',courseSchema);
module.exports = course;
