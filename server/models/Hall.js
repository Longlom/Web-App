const mongoose = require('mongoose');

const Hall = mongoose.Schema({
    hall: String,
    seats: Array,
});

module.exports = mongoose.model('Hall', Hall);
