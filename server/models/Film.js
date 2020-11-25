const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    name: String,
    description: String,
    date: String,
    img: String,
    path: String,
});

module.exports = mongoose.model('Film', filmSchema);