const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const flash = require('connect-flash');

const passportSetup = require('./config/passport-setup');

//utils
const AppErr = require('./utils/appErr');
//const catchAsync = require('./utils/catchAsync');

//routes
const courses = require('./routes/courses');
const teachers = require('./routes/teachers');
const students = require('./routes/students');
const authRoutes = require('./routes/auth-routes');

//run express
const app = express();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.sessionKey,
  cookie:{ 
    httpOnly:true,
    expires: Date.now() + 1000*60*60*24*7 ,
    maxAge: 1000*60*60*24*7,
   }
}));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.sucess = req.flash('sucess');
  res.locals.error = req.flash('error');
  next();
})


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

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
};

//the home route
app.get('/', (req, res) => {
    res.render('home.ejs',{title:'home'});
});

app.use('/courses', courses);
app.use('/teachers',teachers);
app.use('/students',students);
app.use('/auth', authRoutes);

app.get('/error',(req,res)=>{
  kdso;
});

//404 handler
app.all('*',(req,res,next)=>{
  next(new AppErr('not found',404));
});

//error handler
app.use((err,req,res,next)=>{
  const {statusCode= 500 , message= 'something went wrong' } = err;
  res.status(statusCode);
  console.log(err);
  res.send(message);
});

//port
app.listen(3000, () => {
    console.log('Serving on port 3000');
});