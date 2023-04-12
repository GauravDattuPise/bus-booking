const bookingModel = require("../models/bookingModel")
const userModel = require("../models/userModel")
const busModel = require("../models/busModel")
const moment = require('moment')



exports.createBooking = async (req, res) => {
    try {
      let { date, numberOfSeats, userId, busId } = req.body;
  
      if (Object.keys(req.body).length == 0) {
        return res.status(400).send({ status: false, message: "Body can't be empty" });
      }

      if(!date && !numberOfSeats && !userId && busId){
        return res.status(400).send({ status: false, message: "All fields are mandatory" });
      }
  
      let findUser = await userModel.findOne({ _id: userId });
      if (!findUser) {
        return res.status(404).send({ status: false, message: "User not found" });
      }
  
      let findBus = await busModel.findOne({ _id: busId });
      if (!findBus) {
        return res.status(404).send({ status: false, message: "Bus not found" });
      }

      
      if (findBus.availableSeats < numberOfSeats) {
        return res.status(400).send({ status: false, message: "Seats are not available" });
      }
 
      let newBooking = {
        busId: findBus._id,
        userId: findUser._id,
        numberOfSeats: numberOfSeats,
        bookingDate: new Date(),
        date: date,
        totalPrice: numberOfSeats * findBus.pricePerSeat
      };

      let savedBooking = await bookingModel.create(newBooking)
      
  
      // Update the available seats of the bus
      findBus.availableSeats -= numberOfSeats;
      await findBus.save();

      console.log(newBooking)
  
      return res.status(201).send({ status: true, message: "Booking created successfully", data: savedBooking });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };