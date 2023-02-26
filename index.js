const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
//const session = require('express-session');
//const passport = require('passport'); not used for now

//run express
const app = express();

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
    res.send('hello from home');
});

//port
app.listen(3000, () => {
    console.log('Serving on port 3000')
})