const mongoose = require('mongoose');

const HallAndFilm = mongoose.Schema({
    hall: String,
    film: String,
    sessions: [
        {
            time: String,
            seats: Array,
            price: Number,
            bought: Number,
        }
    ]
});

module.exports = mongoose.model('HallAndFilm', HallAndFilm);
