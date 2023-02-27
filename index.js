const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
//const session = require('express-session');
//const passport = require('passport'); not used for now
const Course = require('./models/course')
const Teacher = require('./models/teacher')

//run express
const app = express();

//set the view engine
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));

//method override
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//define static files folder (public)
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongoose
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/school')
  .then(console.log('database connected'))
}

//the home route
app.get('/', (req, res) => {
    res.render('home.ejs',{title:'home'});
});

//////course crud

//see courses
app.get('/courses',async(req,res)=>{
    const courses = await Course.find({});
    res.render('courses/index', { courses , title:'courses' });
});

//new course form
app.get('/courses/new',(req,res)=>{
    res.render('courses/new', {title:'new course'});
})

//create a new course
app.post('/courses', async (req, res) => {
    const course = new Course(req.body.course);
    await course.save();
    res.redirect('/courses');
})

//show course
app.get('/courses/:id', async (req, res,) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/show', { course , title:course.title});
});

//show edit course page
app.get('/courses/:id/edit', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('courses/edit', { course , title:'edit course'});
})

//edit course
app.put('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, { ...req.body.course });
    res.redirect(`/courses/${course._id}`)
});

//delete course
app.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.redirect('/courses');
})

////////// teacher crud
//show teachers
app.get('/teachers',async(req,res)=>{
    const teachers = await Teacher.find({});
    res.render('teachers/index', { teachers , title:'teachers' });
});

app.get('/teachers/new',(req,res)=>{
    res.render('teachers/new', {title:'register'});
})

//create a teacher
app.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body.teacher);
    await teacher.save();
    res.redirect('/teachers');
})

//show teacher
app.get('/teachers/:id', async (req, res,) => {
    const teacher = await Teacher.findById(req.params.id)
    res.render('teachers/show', { teacher , title:teacher.name});
});

//update profile page
app.get('/teachers/:id/edit', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id)
    res.render('teachers/edit', { teacher , title:'edit profile' });
})

//edit teacher
app.put('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, { ...req.body.teacher });
    res.redirect(`/teachers/${teacher._id}`)
});

//delete profile
app.delete('/teachers/:id', async (req, res) => {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.redirect('/teachers');
})

//port
app.listen(3000, () => {
    console.log('Serving on port 3000')
});