const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {teacherSchema} = require('../schemas');
const joi = require('joi');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');
const validate = require('../utils/validate');
const isAuthZ = require('../utils/isAuthZ');
const isLoggedIn = require('../utils/isLoggedIn');
const isTeacher=isAuthZ(['teacher']);

const isOwner = async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    if (!(['teacher'].includes(req.user.role))) {
        req.flash('error','you must be a teacher');
        return res.redirect('/');
    }else if(!(toString(req.user._id) === toString(teacher._id))){
        req.flash('error','you must be the owner');
        return res.redirect('/');
    }
    next();
}

const deleteAuth = async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    if(!(['admin','super admin'].includes(req.user.role)) || (req.user.role === 'teacher' && (toString(req.user._id) === toString(teacher._id)))){
        req.flash('error','not authorized');
        return res.redirect('/');
    }
    next();
}

//validating middleware
const validateTeacher=validate(teacherSchema);
const addEmail = catchAsync(async(req,res,next)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    req.body.teacher.email=teacher.email;
    next();
});

////////// teacher crud

//show teachers
router.get('/',catchAsync(async(req,res)=>{
    const teachers = await User.find({role:'teacher'});
    res.render('teachers/index', { teachers , title:'teachers' });
}));

//new teacher
router.get('/new',catchAsync(async(req,res)=>{
    const users = await User.find({role:{$nin:['super admin','teacher']}});
    res.render('teachers/new', { users , title:'add teacher' });
}));

//create teacher
router.post('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const newTeacher = await User.findByIdAndUpdate(id, { role:'teacher' }).populate('courses');
    req.flash('sucess',`successfully added ${newTeacher.username} as a teacher`);
    res.redirect(`/teachers/${newTeacher._id}`);
}));

router.get('/:id',catchAsync(async(req,res)=>{
    const { id } = req.params;
    const teacher = await User.findById(id);
    res.render('teachers/profile',{ teacher , title:'profile' });
}));

router.get('/:id/edit',isLoggedIn , isOwner ,catchAsync(async(req,res)=>{
    res.render('teachers/edit',{ title:'edit profile' });
}));

router.put('/:id',isLoggedIn , isOwner ,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const updatedTeacher = await User.findByIdAndUpdate(id, { ...req.body.teacher });
    req.flash('sucess','successfully updated your profile');
    res.redirect(`/teachers/${id}`);
}));

router.delete('/:id',isLoggedIn,deleteAuth,catchAsync(async(req,res)=>{
    const { id } = req.params;
    const deletedTeacher = await User.findByIdAndDelete(id);
    req.flash('sucess','successfully deleted ',deletedTeacher.name,' profile');
    res.redirect('/teachers');
}));

// //create a teacher
// router.get('/new',(req,res)=>{
//     res.render('teachers/new', {title:'register'});
// });

// router.post('/', validateTeacher ,catchAsync(async (req, res) => {
//     const teacher = new Teacher(req.body.teacher);
//     await teacher.save();
//     req.flash('sucess','successfully created a teacher\'s profile');
//     res.redirect('/teachers');
// }));

// //show teacher
// router.get('/:id',catchAsync(async (req, res,) => {
//     const teacher = await Teacher.findById(req.params.id).populate('courses');
//     if (!teacher) {
//         req.flash('error', 'Cannot find that teacher!');
//         return res.redirect('/teachers');
//     }
//     res.render('teachers/profile', { teacher , title:teacher.name});
// }));

// //edit teacher
// router.get('/:id/edit', isLoggedIn , isTeacher ,catchAsync(async (req, res) => {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher) {
//         req.flash('error', 'Cannot find that teacher!');
//         return res.redirect('/teachers');
//     };
//     res.render('teachers/edit', { teacher , title:'edit profile' });
// }));

// router.put('/:id', isLoggedIn , isTeacher ,addEmail , validateTeacher ,catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const updatedTeacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
//     req.flash('sucess','successfully updated the teacher\'s profile');
//     res.redirect(`/teachers/${updatedTeacher._id}`);
// }));

// //delete profile
// router.delete('/:id',catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Teacher.findByIdAndDelete(id);
//     req.flash('sucess','successfully deleted the teacher\'s profile');
//     res.redirect('/teachers');
// }));

module.exports = router;