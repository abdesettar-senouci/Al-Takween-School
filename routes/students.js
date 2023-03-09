const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const {studentSchema} = require('../schemas');
const joi = require('joi');
const passport = require('../config/passport-setup');


//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');


//validating middleware
const validateStudent=validate(studentSchema);

////////// student crud

//show students
router.get('/',catchAsync(async(req,res)=>{
    console.log(req.user)
    const students = await Student.find({});
    res.render('students/index', { students , title:'students' });
}));

//create a student
router.get('/new',(req,res)=>{
    res.redirect('/auth/google');
    // res.render('students/new', {title:'register'});
})

router.post('/', validateStudent ,catchAsync(async (req, res) => {
    const student = new Student(req.body.student);
    await student.save();
    req.flash('sucess','successfully created a student profile');
    res.redirect('/students');
}));

//show student
router.get('/:id',catchAsync(async (req, res,) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        req.flash('error', 'Cannot find that student!');
        return res.redirect('/students');
    }
    res.render('students/show', { student , title:student.name});
}));

//edit student
router.get('/:id/edit',catchAsync(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        req.flash('error', 'Cannot find that student!');
        return res.redirect('/students');
    }
    res.render('students/edit', { student , title:'edit profile' });
}));

router.put('/:id', validateStudent ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
    req.flash('sucess','successfully updated the student\'s profile');
    res.redirect(`/students/${student._id}`);
}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    req.flash('sucess','successfully deleted the student\'s profile');
    res.redirect('/students');
}));

module.exports = router;