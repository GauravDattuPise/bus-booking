const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new mongoose.Schema({
  // Define your schema fields here
  name: String,
  age: Number,
  phone: Number,
  email: String,
  gender: String,
  city: String,
  state: String
});

const MyModel = mongoose.model('passenger', passengerSchema);