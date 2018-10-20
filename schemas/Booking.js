const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookingModel = new Schema({
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date },
    carPlate: String,
    state: { type: Number, default: 1 },
    booker: ObjectId,
    parkingLot: ObjectId,
});

module.exports = mongoose.model('Booking', bookingModel);