const bookingModel = require("../models/bookingModel");
const userModel = require("../models/userModel");
const busModel = require("../models/busModel");

// 1. get token from local storage //

//2. then verify the token and get userid from token

//3. if u not get token in local storage then redirect to log in page
//4.
// let token = req.headers['token'];
// console.log(token, "uihyug")

exports.createBooking = async (req, res) => {
  try {
    let { date, numberOfSeats, busId } = req.body;
    let userId = req.userId;

    if (Object.keys(req.body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body can't be empty" });
    }
    if (!date && !numberOfSeats && !busId) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are mandatory" });
    }

    let findBus = await busModel.findOne({ _id: busId });
    if (!findBus) {
      return res.status(404).send({ status: false, message: "Bus not found" });
    }

    if (findBus.availableDates !== date) {
      return res
        .status(404)
        .send({ status: false, message: "Bus is not found on this date" });
    }

    if (findBus.availableSeats < numberOfSeats) {
      return res
        .status(400)
        .send({ status: false, message: "Seats are not available" });
    }

    if (numberOfSeats <= 0) {
      return res
        .status(400)
        .send({ status: false, message: "Seats cant't be less than one" });
    }

    let newBooking = {
      busId: findBus._id,
      numberOfSeats: numberOfSeats,
      bookingDate: new Date(),
      date: date,
      totalPrice: numberOfSeats * findBus.pricePerSeat,
    };

    let savedBooking = await bookingModel.create(newBooking);

    // Update the available seats of the bus
    findBus.availableSeats -= numberOfSeats;
    await findBus.save();

    console.log(newBooking);

    return res
      .status(201)
      .send({
        status: true,
        message: "Booking created successfully",
        data: savedBooking,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    let bookingId = req.params.bookingId;

    const bookingDetails = await bookingModel.findById(bookingId);

    res.status(200).send({ data: bookingDetails });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
