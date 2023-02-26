const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
//const session = require('express-session');
//const passport = require('passport'); not used for now
const Course = require('./models/course')

//run express
const app = express();

//connect to mongoose
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/school')
  .then(console.log('database connected'))
}

//set the view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//method override
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//define static files folder (public)
app.use(express.static(path.join(__dirname, 'public')));

//the home route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

//see courses
app.get('/courses',async(req,res)=>{
    const courses = await Course.find({});
    res.render('courses/index', { courses });
});

//new course form
app.get('/courses/new',(req,res)=>{
    res.render('courses/new');
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
    res.render('courses/show', { course });
});

//port
app.listen(3000, () => {
    console.log('Serving on port 3000')
});