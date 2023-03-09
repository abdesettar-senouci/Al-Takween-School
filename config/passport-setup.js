const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/user');

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
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                done(null, currentUser);
                // do something
            } else {
                // if not, create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email:profile._json.email,
                    name:profile.displayName,
                    created:new Date(),
                    role:'student'
                }).save().then(async (newUser) => {
                    if(newUser.googleId===process.env.superAdminId){
                        await User.findOneAndUpdate({googleId:newUser.googleId}, {role:'super admin'} ,{new: true})
                    };
                done(null, newUser);
                });
            }
        });
    })
);