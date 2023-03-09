const express = require('express');
const router = express.Router();
const User = require('../models/user');

//utils
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appErr');

// //validating middleware
// const validateTeacher=validate(teacherSchema);

router.get('/',(req,res)=>{
    res.render('indexes/super-admin',{title:'dashboard'});
});

router.get('/admins/new',catchAsync(async(req,res)=>{
    const users = await User.find({role:{$nin:['super admin','admin']}});
    res.render('admins/index', { users , title:'all users' });
}));


//create admins
router.post('/admins/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const newAdmin = await User.findByIdAndUpdate(id, { role:'admin' });
    req.flash('sucess',`successfully added ${newAdmin.username} as an admin`);
    res.redirect(`/superadmin`);
}));

//delete admins
router.get('/admins',catchAsync(async (req, res) => {
    const users = await User.find({role:{$eq:'admin'}});
    res.render('admins/delete',{users,title:'delete admin'});
}));

router.delete('/admins/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    req.flash('sucess',`successfully deleted ${user.username}`);
    res.redirect('/superadmin');
}));

module.exports = router;