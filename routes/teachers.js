const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

////////// teacher crud
//show teachers
router.get('/',async(req,res)=>{
    const teachers = await Teacher.find({});
    res.render('teachers/index', { teachers , title:'teachers' });
});

router.get('/new',(req,res)=>{
    res.render('teachers/new', {title:'register'});
})

//create a teacher
router.post('/', async (req, res) => {
    const teacher = new Teacher(req.body.teacher);
    await teacher.save();
    res.redirect('/teachers');
})

//show teacher
router.get('/:id', async (req, res,) => {
    const teacher = await Teacher.findById(req.params.id)
    res.render('teachers/show', { teacher , title:teacher.name});
});

//update profile page
router.get('/:id/edit', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id)
    res.render('teachers/edit', { teacher , title:'edit profile' });
})

//edit teacher
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
    res.redirect(`/teachers/${teacher._id}`)
});

//delete profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.redirect('/teachers');
});

module.exports = router;