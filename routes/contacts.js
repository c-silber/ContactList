var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'), contacts = mongoose.model('contacts');

/* GET contacts page */
router.get('/', function (req, res, next) {
    var db = req.db;
    contacts.find({}, {}, function (e, data) {
        for (i in data){
            console.log(data[i].firstName);
    }
        res.render('contacts', 
                   {"contactList": data,
                   place_urls: JSON.stringify(data)});
    });
});

router.delete('/', function (req, res, next) {
    console.log(req.body.id);
    contacts.remove({_id: req.body.id}, function (err, records) {
        if (err) {
            console.log("couldn't remove");
        } else {
            console.log("removed");   
        }
    });
});

module.exports = router;