var mongoose = require('mongoose');
    Schema = mongoose.Schema;

// Contacts Model
var contactSchema = new Schema({
    Title: String,
    FirstName: String,
    LastName: String,
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
    ContactMethods:
        {
            Email: Boolean,
            Phone: Boolean, 
            Mail: Boolean
        }
});

module.exports = mongoose.model('contacts', contactSchema);