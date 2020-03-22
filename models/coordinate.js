const mongoose = require('mongoose');

const Coordinate = mongoose.model('coordinate', {
    x_cord: { type: Number },
    y_cord: { type: Number }
});
module.exports = { Coordinate };