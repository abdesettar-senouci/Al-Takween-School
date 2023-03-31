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
    if(admins) return res.status(200).send(admins);
    res.status(500).send({err:'no admins found'});
}));

//create admins
router.post('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const newAdmin = await User.findByIdAndUpdate(id, { role:'admin' },{new:true});
    if(newAdmin) return res.status(200).send(newAdmin);
    res.status(500).send({err:'err creating admin'});
}));


router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if(user) return res.status(200).send(user);
    res.status(400).send({err:'user not found'});
}));

module.exports = router;