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
    req.flash('sucess','successfully created a teacher\'s profile');
    res.redirect('/teachers');
}));

//show teacher
router.get('/:id',catchAsync(async (req, res,) => {
    const teacher = await Teacher.findById(req.params.id).populate('courses');
    if (!teacher) {
        req.flash('error', 'Cannot find that teacher!');
        return res.redirect('/teachers');
    }
    res.render('teachers/show', { teacher , title:teacher.name});
}));

//edit teacher
router.get('/:id/edit',catchAsync(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
        req.flash('error', 'Cannot find that teacher!');
        return res.redirect('/teachers');
    };
    res.render('teachers/edit', { teacher , title:'edit profile' });
}));

router.put('/:id', validateTeacher ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
    req.flash('sucess','successfully updated the teacher\'s profile');
    res.redirect(`/teachers/${teacher._id}`);
}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    req.flash('sucess','successfully deleted the teacher\'s profile');
    res.redirect('/teachers');
}));

module.exports = router;