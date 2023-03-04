const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const {teacherSchema} = require('../schemas');
const joi = require('joi');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');

//validating middleware
const validateTeacher=validate(teacherSchema);

////////// teacher crud

//show teachers
router.get('/',catchAsync(async(req,res)=>{
    const teachers = await Teacher.find({});
    res.render('teachers/index', { teachers , title:'teachers' });
}));

//create a teacher
router.get('/new',(req,res)=>{
    res.render('teachers/new', {title:'register'});
});

router.post('/', validateTeacher ,catchAsync(async (req, res) => {
    const teacher = new Teacher(req.body.teacher);
    await teacher.save();
    res.redirect('/teachers');
}));

//show teacher
router.get('/:id',catchAsync(async (req, res,) => {
    const teacher = await Teacher.findById(req.params.id).populate('courses');
    res.render('teachers/show', { teacher , title:teacher.name});
}));

//edit teacher
router.get('/:id/edit',catchAsync(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    res.render('teachers/edit', { teacher , title:'edit profile' });
}));

router.put('/:id', validateTeacher ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
    res.redirect(`/teachers/${teacher._id}`);
}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.redirect('/teachers');
}));

module.exports = router;