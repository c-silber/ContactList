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

passport.use(new localStrategy(
    {
        username: 'username',
        password: 'password'
    },
    function (user, pswd, done) {
        if (user !== username) {
            console.log("Username mismatch");
            return done(null, false, {message: "Username is incorrect"});
        }
    
        bcrypt.compare(pswd, password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                console.log("Password mismatch");
            } else {
                    console.log("Valid credentials");
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
    res.render('login', {title: 'Contact Login'});
});

/* POST login page */
router.post('/',
    passport.authenticate('local', 
                          { successRedirect: '/contacts',
                                   failureRedirect: '/login',
                                   badRequestMessage : 'Missing username or password.',
                                   failureFlash: true 
                          })
);

module.exports = router;