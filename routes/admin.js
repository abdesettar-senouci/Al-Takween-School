const express = require('express');
const router = express.Router();
const User = require('../models/user');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');

// //validating middleware
// const validateTeacher=validate(teacherSchema);

router.get('/',(req,res)=>{
    res.render('indexes/admin',{title:'admin dashboard'});
});

//add teacher
router.get('/teachers/new',catchAsync(async(req,res)=>{
    const users = await User.find({role:{$nin:['super admin','admin','teacher']}});
    res.render('teachers/index', { users , title:'add teacher' });
}));


//create teacher
router.post('/teachers/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const newTeacher = await User.findByIdAndUpdate(id, { role:'teacher' });
    req.flash('sucess',`successfully added ${newTeacher.username} as a teacher`);
    res.redirect(`/admin`);
}));

//delete teacher
router.get('/teachers',catchAsync(async (req, res) => {
    const users = await User.find({role:{$eq:'teacher'}});
    res.render('teachers/delete',{users,title:'delete teacher'});
}));

router.delete('/teachers/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    req.flash('sucess',`successfully deleted ${user.username}`);
    res.redirect('/admin');
}));

module.exports = router;