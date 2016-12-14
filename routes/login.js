var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), dbUser = mongoose.model('user');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
    function(username, password, done) {
        dbUser.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
)); 
             
/* GET login page */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Contact Login'});
});

/* POST login page */
router.post('/',
  passport.authenticate('local', { successRedirect: '/contacts',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

module.exports = router;