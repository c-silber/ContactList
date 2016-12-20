var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var username = 'cmps369', password = 'finalproject';
bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
        password = hash;
        console.log("Hashed password = " + password);
    });
});

message = 'none';

passport.use(new localStrategy(
    {
        username: 'username',
        password: 'password'
    },
    function (user, pswd, done) {
        if (user !== username) {
            console.log("Username mismatch");
            message='Invalid Username';
            return done(null, false, {message: "Invalid Password"});
        }
    
        bcrypt.compare(pswd, password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                message='Invalid Password';
                return done(null, false,  {message: "Invalid Password"});
                console.log("Password mismatch");
            } else {
                    message = 'none';
                    return done(null, isMatch);
            }
            done(null, isMatch);
        });
    }
));

passport.serializeUser(function (username, done) {
    console.log("Serialized " + username);
    done(null, username);
});

passport.deserializeUser(function (username, done){
    console.log("deserialized " + username);
    done(null, username);
});
             
/* GET login page */
router.get('/', function (req, res, next) {
    var errorMessage = message;
    message = 'none';
    res.render('login', {title: 'Contact Login', message: errorMessage});
});

/* POST login page */
router.post('/',
    passport.authenticate('local', 
                          { successRedirect: '/contacts',
                                   failureRedirect: '/login',
                                   badRequestMessage : 'Incorrect username or password.',
                                   failureFlash: true 
                          })
);

module.exports = router;