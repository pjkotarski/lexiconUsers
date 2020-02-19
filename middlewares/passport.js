const passport = require('passport');
const UserModel  = require('../models/user')
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy( (username, password, done) => {

    UserModel.getMatchingEmail(username)
        .then(user => {

            if (!user) return done(false, null);

            user.verifyPassword(password)
                .then(resp => {
                    if (resp) {
                        return done(true, user)
                    }
                    
                    return done(false, null)
                }).catch(err => {
                    return done(err)
                })
        }).catch(err => { 
            return done(err)
        })
    }
));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL : "http://localhost:3000/auth/facebook/callback"
    }, 
    function(accessToken, refreshToken, profile, cb) { 
        //in here you need a function that finds users by their facebook login info,
        // or creates one if they don't have one yet. 
        // results in simply returning a user type. 

    }
))


