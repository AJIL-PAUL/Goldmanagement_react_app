const mongoose = require('mongoose');

var Gold = mongoose.model('gold', {

    goldid: { type: Number },
    weight: { type: Number },
    ownerName: { type: String },
    racketid: { type: Number }

});
module.exports = { Gold };