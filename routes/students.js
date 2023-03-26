const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {studentSchema} = require('../schemas');
const joi = require('joi');
const passport = require('../config/passport-setup');


//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');
const isLoggedIn = require('../utils/isLoggedIn');
const isAdmin = require('../utils/isAdmin');

//validating middleware
const validateStudent=validate(studentSchema);

////////// student crud

//show students
router.get('/',catchAsync(async(req,res)=>{
    console.log(req.user);
    const students = await User.find({role:'student'},{googleId:0});
    if(students){
        res.status(200).send(students);
    }else{
        res.status(500).send('error occured');
    }
}));

//show student
router.get('/:id',catchAsync(async (req, res,) => {
    const student = await User.findById(req.params.id);
    if (!student) {
        return res.status(400).send('no student found');
    }
    res.status(200).send(student);
}));

//edit student
router.get('/:id/edit',catchAsync(async (req, res) => {
    const student = await User.findById(req.params.id);
    if (!student) {
        return res.status(400).send('no student found');
    }
    res.status(200).send(student);
}));

router.put('/:id',catchAsync(async (req, res) => {
    console.log(req.body.student)
    const { id } = req.params;
    const student = await User.findByIdAndUpdate(id, { ...req.body.student },{new:true});
    if(student){
        res.status(200).send(student);
    }
}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const student = await User.findByIdAndDelete(id);
    if(student){
        return res.status(200).send(student)
    }else{
        res.status(400).send('error');
    }
}));

module.exports = router;