const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  stripeChargeId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports  = mongoose.model('payment', paymentSchema);


