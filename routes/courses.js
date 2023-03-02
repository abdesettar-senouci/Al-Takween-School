const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const joi = require('joi');
const {courseSchema} = require('../schemas');

//utils
const catchAsync = require('../utils/catchAsync');
const validate = require('../utils/validate');
const AppErr = require('../utils/appErr')

//validating middleware
const validateCourse=validate(courseSchema);

//////course crud

//see courses
router.get('/',catchAsync(async(req,res)=>{
    const courses = await Course.find({});
    res.render('courses/index', { courses , title:'courses' });
}));

//create a new course
router.get('/new',(req,res)=>{
    res.render('courses/new', {title:'new course'});
})

router.post('/', validateCourse, catchAsync(async (req, res) => {
    const course = new Course(req.body.course);
    await course.save();
    res.redirect('/courses');
}));

//show course
router.get('/:id', catchAsync(async (req, res,) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/show', { course , title:course.title});
}));

//edit course
router.get('/:id/edit',catchAsync(async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/edit', { course , title:'edit course'});
}));

router.put('/:id', validateCourse ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
    res.redirect(`/courses/${course._id}`)
}));

//delete course
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.redirect('/courses');
}));

module.exports = router;
