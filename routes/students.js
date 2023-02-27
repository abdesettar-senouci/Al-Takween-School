const express = require('express');
const router = express.Router();
const Student = require('../models/student');

////////// student crud
//show students
router.get('/',async(req,res)=>{
    const students = await Student.find({});
    res.render('students/index', { students , title:'students' });
});

router.get('/new',(req,res)=>{
    res.render('students/new', {title:'register'});
})

//create a student
router.post('/', async (req, res) => {
    const student = new Student(req.body.student);
    await student.save();
    res.redirect('/students');
})

//show student
router.get('/:id', async (req, res,) => {
    const student = await Student.findById(req.params.id)
    res.render('students/show', { student , title:student.name});
});

//update profile page
router.get('/:id/edit', async (req, res) => {
    const student = await Student.findById(req.params.id)
    res.render('students/edit', { student , title:'edit profile' });
})

//edit student
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
    res.redirect(`/students/${student._id}`)
});

//delete profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.redirect('/students');
});

module.exports = router;