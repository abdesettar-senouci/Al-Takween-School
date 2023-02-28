const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
//const session = require('express-session');
//const passport = require('passport'); not used for now
const Course = require('./models/course');
const Teacher = require('./models/teacher');

//routes
const courses = require('./routes/courses');
const teachers = require('./routes/teachers');
const students = require('./routes/students');

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
  .then(console.log('database connected'));
}

//the home route
app.get('/', (req, res) => {
    res.render('home.ejs',{title:'home'});
});

app.use('/courses', courses);
app.use('/teachers',teachers);
app.use('/students',students);

//404 handler
app.use((req,res)=>{
  res.status(404).render('404',{path:req.path , title:'not found' , statusCode:res.statusCode});
});

//error handler
// app.use((err,req,res,next)=>{
//   console.log("error is here",err);
//   console.log("end err");
//   res.send('error');
// })

//port
app.listen(3000, () => {
    console.log('Serving on port 3000')
});