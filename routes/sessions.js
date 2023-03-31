const express = require('express');
const router = express.Router();
const Session = require('../models/session');
// const joi = require('joi');
// const {courseSchema} = require('../schemas');

//utils
const catchAsync = require('../utils/catchAsync');
// const validate = require('../utils/validate');
const AppErr = require('../utils/appErr');
// const isLoggedIn = require('../utils/isLoggedIn');
// const isTeacher = require('../utils/isTeacher');
// const isOwner = require('../utils/isOwner');

//validating middleware
// const validateCourse=validate(courseSchema);



//get sessions
router.get('/', catchAsync(async(req,res)=>{
    const sessions = await Session.find({});
    if(sessions) return res.status(200).send(sessions);
    res.status(500).send({err:'no sessions found'});
}));

//new session
router.post('/', catchAsync(async (req, res) => {
    const session = new Session(req.body.session);
    const newSession = await session.save();
    res.status(200).send(newSession);
}));

//show session
router.get('/:id', catchAsync(async (req, res,) => {
    const session = await Session.findById(req.params.id);
    if(session) return res.status(200).send(session);
    res.status(400).send({err:'session not found'});
}));

router.put('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, { ...req.body.session },{new:true});
    if(session) return res.status(200).send(session);
    res.status(500).send({err:'error'});
}));

//delete profile
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const session = await Session.findByIdAndDelete(id);
    if(session) return res.status(200).send(session);
    res.status(400).send({err:'session not found'});
}));


module.exports = router;