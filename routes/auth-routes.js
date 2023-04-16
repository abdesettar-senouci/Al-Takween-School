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
    res.redirect('http://localhost:3001/');
});

// auth with google
router.get('/google',addSignupFields,passport.authenticate('google', {scope: ['profile','email']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.session)
    req.session.user = req.user;
    res.redirect(`http://localhost:3001/`);
    // res.status(200).send()
});

router.get('/me', (req, res) => {
    if (req.session.user) {
      res.json({ data : req.session.user , hi:'hi'} );
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });

module.exports = router;