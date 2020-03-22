const mongoose = require('mongoose');
const coordinateSchema = new mongoose.Schema({
    x_cord: { type: Number },
    y_cord: { type: Number }
});
const Coordinate = mongoose.model("coordinate", coordinateSchema);
const Box = mongoose.model('box', {
    racket_id: [coordinateSchema],
    total_weight: { type: Number },
    rem_weight: { type: Number },
    no_of_items: { type: Number },
    status: { type: String }

});
module.exports = { Box, Coordinate };