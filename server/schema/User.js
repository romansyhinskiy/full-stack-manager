const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: {
        type: String,
        unique: [true, 'Email must be unique']
    },
    password: String
})

const user = mongoose.model('user', userSchema);
module.exports = user;