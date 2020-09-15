const {Schema, model} = require('mongoose');

const schema = new Schema({
    film: {type: String, required:true},
    price: {type: Number, required: true}
});

module.exports = model('Ticket', schema);