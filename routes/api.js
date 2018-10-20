const express = require('express');
const Booking = require('../schemas/Booking');
const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
const open = require('amqplib').connect(url);

const router = express.Router();

//Booking api
router.get('/booking', (req, res) => {

    const limit = parseInt(req.query.limit);

    req.query.limit = undefined;

    Booking.find(req.query, null, {limit: limit}, (err, bookings) => {
        res.json(bookings);
    });
})
.put('/booking/:bookingId', (req, res) => {
    Booking.findByIdAndUpdate(req.params.bookingId, req.body, (err, booking) => {
        res.json(booking);
    });
})
.patch('/booking/:bookingId', (req, res) => {
    Booking.findById(req.param.bookingId, (err, booking) => {
        booking.state = req.body.state;
        booking.updatedAt = Date.now;
        booking.save();
        res.json(booking);
    });
})
.post('/booking', (req, res) => {
    let booking = new Booking(req.body);
    booking.save();
    res.status(201).send(booking);
});

router.get('/hello', (req, res) => {
    res.send('Hello world booking');
});

module.exports = router;