const bookingModel = require("../models/bookingModel")
const userModel = require("../models/userModel")
const busModel = require("../models/busModel")

exports.createBooking = async (req, res) => {
    try {
      let { date, numberOfSeats, userId, busId } = req.body;
  
      if (Object.keys(req.body).length == 0) {
        return res.status(400).send({ status: false, message: "Body can't be empty" });
      }
  
      let findUser = await userModel.findById(userId);
      if (!findUser) {
        return res.status(404).send({ status: false, message: "User not found" });
      }
  
      let findBus = await busModel.findById(busId);
      if (!findBus) {
        return res.status(404).send({ status: false, message: "Bus not found" });
      }
  
      if (findBus.availableSeats < numberOfSeats) {
        return res.status(400).send({ status: false, message: "Seats are not available" });
      }
  
      // Calculate the total price based on the number of seats and price per seat
      let totalPrice = numberOfSeats * findBus.pricePerSeat;
  
      // Create a new booking document
      let newBooking = new bookingModel({
        bus: findBus._id,
        user: findUser._id,
        seatNumber: numberOfSeats,
        date: date,
        totalPrice: totalPrice, // add the total price to the booking
      });
  
      // Update the available seats of the bus
      findBus.availableSeats -= numberOfSeats;
      await findBus.save();
  
      // Save the new booking
      await newBooking.save();
  
      return res.status(201).send({ status: true, message: "Booking created successfully", data: newBooking });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  