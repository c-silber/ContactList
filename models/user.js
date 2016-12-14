var mongoose = require('mongoose');
    Schema = mongoose.Schema;

// User Model
var userSchema = new Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('user', userSchema);