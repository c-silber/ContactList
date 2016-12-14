var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'), contacts = mongoose.model('contacts');

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    contacts.find({}, {}, function (e, data) {
        return data;
        res.end();
    });
});

module.exports = router;
