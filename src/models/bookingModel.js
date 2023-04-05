const mongoose = require('mongoose');

let ObjectId = Schema.Types.ObjectId

const bookingSchema = new mongoose.Schema({
  busId: {
    type: ObjectId ,
    ref: 'bus',
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
    numberOfSeat: {
    type: Number,
    required: true,
  },
//   seatNumber: {
//     type: Number,
//     required: true,
//   },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('booking', bookingSchema);