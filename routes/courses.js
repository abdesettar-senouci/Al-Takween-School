const express = require('express');
const router = express.Router();
const Course = require('../models/course');

//////course crud

//see courses
router.get('/',async(req,res)=>{
    const courses = await Course.find({});
    res.render('courses/index', { courses , title:'courses' });
});

//new course form
router.get('/new',(req,res)=>{
    res.render('courses/new', {title:'new course'});
})

//create a new course
router.post('/', async (req, res) => {
    const course = new Course(req.body.course);
    await course.save();
    res.redirect('/courses');
})

//show course
router.get('/:id', async (req, res,) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/show', { course , title:course.title});
});

//show edit course page
router.get('/:id/edit', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/edit', { course , title:'edit course'});
})

//edit course
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
    res.redirect(`/courses/${course._id}`)
});

//delete course
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.redirect('/courses');
})

module.exports = router;
