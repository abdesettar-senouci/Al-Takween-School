const express = require('express');
const router = express.Router();
const User = require('../models/user');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');

// //validating middleware
// const validateTeacher=validate(teacherSchema);

router.get('/',catchAsync(async(req,res)=>{
    const admins = await User.find({role:'admin'});
    res.render('admins/index', {admins,title:'all admins'});
}));

router.get('/new',catchAsync(async(req,res)=>{
    const users = await User.find({role:{$nin:['super admin','admin']}});
    res.render('admins/new', { users , title:'add admin' });
}));


//create admins
router.post('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const newAdmin = await User.findByIdAndUpdate(id, { role:'admin' });
    req.flash('sucess',`successfully added ${newAdmin.username} as an admin`);
    res.redirect('/admins');
}));


router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    req.flash('sucess',`successfully deleted ${user.username}`);
    res.redirect('/admins');
}));




// router.get('/',(req,res)=>{
//     res.render('indexes/admin',{title:'admin dashboard'});
// });

// //add teacher
// router.get('/teachers/new',catchAsync(async(req,res)=>{
//     const teachers = await User.find({role:{$nin:['super admin','admin','teacher']}});
//     res.render('teachers/index', { teachers , title:'add teacher' });
// }));


// //create teacher
// router.post('/teachers/:id',catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const newTeacher = await User.findByIdAndUpdate(id, { role:'teacher' });
//     req.flash('sucess',`successfully added ${newTeacher.username} as a teacher`);
//     res.redirect(`/admin`);
// }));

// //delete teacher
// router.get('/teachers',catchAsync(async (req, res) => {
//     const teachers = await User.find({role:{$eq:'teacher'}});
//     res.render('teachers/delete',{teachers,title:'delete teacher'});
// }));

// // router.delete('/teachers/:id',catchAsync(async (req, res) => {
// //     const { id } = req.params;
// //     const user = await User.findByIdAndDelete(id);
// //     req.flash('sucess',`successfully deleted ${user.username}`);
// //     res.redirect('/admin');
// // }));

module.exports = router;