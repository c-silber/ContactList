var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'), dbContact = mongoose.model('contacts');
var geocoder = require('geocoder');

/* GET mailer page */
router.get('/', function (req, res, next) {
    res.render('mailer', {title: 'Contact Form'});
});

/* POST mailer page */
router.post('/', function (req, res, next) {
    var address = req.body.street + ', ' + req.body.city + ' ' + req.body.state + ', ' + req.body.zip;

    geocoder.geocode(address, function (err, data) {
        if (err) {throw (err); }
        var lat = data.results[0].geometry.location.lat,
            long = data.results[0].geometry.location.lng;

        var newContact = new dbContact();
        newContact.title = req.body.title;
        newContact.firstName = req.body.firstName;
        newContact.lastName = req.body.lastName;
        newContact.Address.Street = req.body.street;
        newContact.Address.City = req.body.city;
        newContact.Address.State = req.body.state;
        newContact.Geocode.Longitude = long;
        newContact.Geocode.Latitude = lat;
        newContact.Address.Zip = req.body.zip;
        newContact.Phone = req.body.phone;
        newContact.Email = req.body.email;

        newContact.save(function (error) {
            if (error) {
                throw (error);
            } else { res.render('confirmation') }
        });

    });
});

module.exports = router;