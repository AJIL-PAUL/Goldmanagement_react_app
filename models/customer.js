const mongoose = require('mongoose');
const coordinateSchema = new mongoose.Schema({
    x_cord: { type: Number },
    y_cord: { type: Number }
});
// const Coordinate = mongoose.model("coordinate1", coordinateSchema);
var Customer = mongoose.model('customer', {

    customer_id: { type: Number, unique: true },
    weight: { type: Number },
    ownerName: { type: String },
    racket_id: [coordinateSchema],
    status: { type: String }

});
module.exports = { Customer };