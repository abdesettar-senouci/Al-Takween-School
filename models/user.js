const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    email:String,
    role: {
        type: String,
        enum: ['super admin','admin', 'teacher', 'student'],
    },
    img:String,
},
    { timestamps: true }
);

const studentSchema = new Schema({
    appliedCourses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Course'
        }] , 
    },
    enrolledCourses:{
        type : [{
            type : Schema.Types.ObjectId , 
            ref: 'Course'
        }] , 
    },
    teachers: {
        type:[{
            type:Schema.Types.ObjectId,
            ref:'Teacher'
        }]
    },
    academicLevel:String,
    phone:String,
    address:String,
    dateOfBirth:Date,
});


const User = mongoose.model('User', userSchema);
const Student = User.discriminator('Student', studentSchema);
module.exports = {User,Student};