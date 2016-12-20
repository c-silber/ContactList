var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'), contacts = mongoose.model('contacts');

var ensureLoggedIn = function(req, res, next) {
    if (req.user){
        next();
    } else {
        res.redirect('/login');
    }
}

/* GET contacts page */
router.get('/', ensureLoggedIn, function (req, res, next) {
    var db = req.db;
    contacts.find({}, {}, function (e, data) {
        res.render('contacts', 
                   {"contactList": data,
                   place_urls: JSON.stringify(data)});
    });
});

/* POST contacts page */
router.post('/', function (req, res, next) {
    console.log(req.body); 
    var title = req.body.data[0];
    var firstName = req.body.data[1];
    var lastName = req.body.data[2];
    var address = req.body.data[3];
    var city = req.body.data[4];
    var state = req.body.data[5];
    var zip = req.body.data[6];
    var phone = req.body.data[7];
    var email = req.body.data[8];
    var id = req.body.data[9];
    var cEmail = req.body.data[10];
    var cPhone = req.body.data[11];
    var cMail = req.body[12];

    contacts.update(
        {_id: id}, 
        {$set: {
            "Title": title,
            "FirstName": firstName,
            "LastName": lastName,
            "Address.Street": address,
            "Address.City": city,
            "Address.State": state,
            "Address.Zip": zip,
            "Phone": phone,
            "Email": email,
            "ContactMethods.Email": cEmail,
            "ContactMethods.Phone": cPhone,
            "ContactMethods.Mail": cMail
            }
        }, 
        { upsert:false }, 
        function (err, doc) {
            if (err) console.log(err);
            else console.log(doc);
        });
});

/* DELETE contacts page */
router.delete('/', function (req, res, next) {
    contacts.remove({_id: req.body.id}, function (err, records) {
        if (err) {
            console.log("couldn't remove");
        } else {
            console.log("removed");  
        }
    });
});

module.exports = router;