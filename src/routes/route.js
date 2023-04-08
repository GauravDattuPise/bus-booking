const express = require('express')
const router = express.Router()

const {createUser, login, getuser} = require("../controllers/userController")
const {createBus,  getBus} = require("../controllers/busController")

const {createBooking} = require("../controllers/bookingController")

const {createPassenger} = require("../controllers/passengerController")
router.post("/createUser", createUser)
router.post("/login", login)

router.get("/getuser", getuser)


//Bus API
router.post("/createBus", createBus)
router.get("/getBus", getBus)

//Booking API

router.post("/createBooking", createBooking)

module.exports = router

//Passenger API

router.post("/createPassenger", createPassenger)