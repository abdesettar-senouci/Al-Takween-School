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


//////course crud

//see courses
router.get('/', catchAsync(async(req,res)=>{
    const courses = await Course.find({}).populate('teacher');
    res.render('courses/index', { courses , title:'courses' });
}));

//create a new course
router.get('/new',isLoggedIn,isTeacher,(req,res)=>{
    res.render('courses/new', {title:'new course'});
})

router.post('/',isLoggedIn,isTeacher,validateCourse , catchAsync(async (req, res) => {
    req.body.course.teacher = req.user._id;
    const course = new Course(req.body.course);
    const newCourse = await course.save();
    const teacher = await Teacher.findByIdAndUpdate(req.user._id,{$push:{courses:newCourse._id}});
    req.flash('sucess','successfully created a new course');
    res.redirect('/courses');
}));

//show course
router.get('/:id', catchAsync(async (req, res,) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        req.flash('error', 'Cannot find that course!');
        return res.redirect('/courses');
    }
    res.render('courses/show', { course , title:course.title});
}));

//edit course
router.get('/:id/edit',isLoggedIn,isOwner,catchAsync(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        req.flash('error', 'Cannot find that course!');
        return res.redirect('/courses');
    }
    res.render('courses/edit', { course , title:'edit course'});
}));

router.put('/:id',isLoggedIn,isOwner ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const c = await Course.findById(id).populate('teacher');
    req.body.course.teacher=c.teacher;
    const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
    req.flash('sucess','successfully updated the course');
    res.redirect(`/courses/${course._id}`);
}));

//delete course
router.delete('/:id',isLoggedIn,isOwner,catchAsync(async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    req.flash('sucess','successfully deleted the course');
    res.redirect('/courses');
}));

module.exports = router;
