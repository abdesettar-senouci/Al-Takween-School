const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const {User,Student} = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect',
        passReqToCallback: true
    }, (req,accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                done(null, currentUser);
                // do something
            } else {
                // if not, create user in our db
                if(profile.id === process.env.superAdminId){
                    new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email:profile._json.email,
                    name:profile.displayName,
                    role:'super admin',
                    }).save().then(async(superAdmin)=>{
                        done(null,superAdmin);
                    })
                }else{
                new Student({
                    username: profile.displayName,
                    googleId: profile.id,
                    email:profile._json.email,
                    name:profile.displayName,
                    role:'student',
                    //get the other informations 
                    academicLevel:req.session.additionalFields.academicLevel,
                    phone:req.session.additionalFields.phone,
                    address:req.session.additionalFields.address,
                }).save().then(async (newUser) => {
                    done(null, newUser);
                }); 
                }
            }
        });
    })
);