const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId

const bookingSchema = new mongoose.Schema({

  busId: {
    type: ObjectId,
    ref: 'bus',
    required: true,
  },

  userId: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
    // required: true,
  },

  bookingDate: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('booking', bookingSchema);