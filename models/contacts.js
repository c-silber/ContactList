var mongoose = require('mongoose');
    Schema = mongoose.Schema;

// Contacts Model
var contactSchema = new Schema({
    title: String,
    firstName: String,
    lastName: String,
    Address:
        {
            Street: String,
            City: String,
            State: String,
            Zip: String
        },
    Geocode: {
        Longitude: Number,
        Latitude: Number
    },
    Phone: String,
    Email: String,
});

module.exports = mongoose.model('contacts', contactSchema);