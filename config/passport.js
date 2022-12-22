const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var User=require('../Models/user');
const {checkPassword} = require('../lib/passwordValid');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
    done(err, user);       
    });
});

passport.use(new LocalStrategy(
    // function of username, password, done(callback)
    function(username, password, done) {
      // look for the user data
      User.findOne({ username: username }, function (err, user) {
        // if there is an error
        if (err) { return done(err); }
        // if user doesn't exist
        if (!user) { return done(null, false, { message: 'User not found.' }); }
        // if the password isn't correct
        if (!user.verifyPassword(password)) { return done(null, false, {   
        message: 'Invalid password.' }); }
        // if the user is properly authenticated
        return done(null, user);
      });
    }
  ));