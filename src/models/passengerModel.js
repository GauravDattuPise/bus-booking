const mongoose = require('mongoose');


const passengerSchema = new mongoose.Schema({
  // Define your schema fields here
  name:{
  type: String,
  required: true
},
  age: {
    type:Number,
  required:true},

  phone:{ 
    type:Number,
  require:true},
  email:{
    type:String,
    required: true
  },
  gender: {
    
    type: String,
    enum: ["Male","Female","Other"],
    required:true
  },
  city:{
    type: String,
    required:true,
  },
  state: {
    type: String,
    required:true,
  }
});

module.exports = mongoose.model('passenger', passengerSchema);