const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Teacher = require('../models/user');
const joi = require('joi');
const {courseSchema} = require('../schemas');

//utils
const catchAsync = require('../utils/catchAsync');
const validate = require('../utils/validate');
const AppErr = require('../utils/appErr');
const isLoggedIn = require('../utils/isLoggedIn');
const isTeacher = require('../utils/isTeacher');
const isOwner = require('../utils/isOwner');

//validating middleware
const validateCourse=validate(courseSchema);

const addTeacher = async (req,res,next)=>{
    const c = await Course.findById(req.params.id).populate('teacher');
    req.body.course.teacher = c.teacher.name;
    next();
};


//see courses
router.get('/', catchAsync(async(req,res)=>{
    const courses = await Course.find({}).populate('teacher');
    if(courses) return res.status(200).send(courses);
    res.status(500).send({err:'no courses found'});
}));

//new
router.post('/', catchAsync(async (req, res) => {
    const course = new Course(req.body.course);
    const newCourse = await course.save();
    if(newCourse) return res.status(200).send(newCourse);
    res.status(500).send({err:'err creating course'});
}));

//show
router.get('/:id', catchAsync(async (req, res,) => {
    const course = await Course.findById(req.params.id);
    if(course) return res.status(200).send(course);
    res.status(400).send({err:'course not found'});
}));

//edit
router.put('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const c = await Course.findById(id).populate('teacher');
    const course = await Course.findByIdAndUpdate(id, { ...req.body.course },{new:true});
    if(course) return res.status(200).send(course);
    res.status(500).send({err:'error'});
}));

//delete
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if(course) return res.status(200).send(course);
    res.status(400).send({err:'course not found'});
}));

module.exports = router;
