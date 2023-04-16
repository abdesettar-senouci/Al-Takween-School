const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const MongoStore = require('connect-mongo');



router.use(session({
    secret: process.env.sessionKey,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
  

const addSignupFields = (req,res,next)=>{
    req.session.additionalFields = {academicLevel:'default',phone:'0666666666',address:'fake address'};
    next();
}

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google
router.get('/google',addSignupFields,passport.authenticate('google', {scope: ['profile','email']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(res.session);
    res.redirect('/')
    // res.status(200).send()
});

module.exports = router;