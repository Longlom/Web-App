const mongoose = require('mongoose');

const Info = mongoose.Schema({
    name: String,
    description: String,
    sessions: [
        {
            _id : Number,
            time: String,
            price: Number,
            type: {
               type: { type: String }
            },
            amount: Number
        }
    ],
    path: String,
});

module.exports = mongoose.model('Info', Info);