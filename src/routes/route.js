const express = require('express')
const router = express.Router()

const {createUser, login, getuser} = require("../controllers/userController")
const {createBus,  getBus} = require("../controllers/busController")

const {createBooking, getBooking} = require("../controllers/bookingController")

const {createPassenger} = require("../controllers/passengerController")

const {authentication,authorization} = require("../middleware/auth")

router.post("/createUser", createUser)

router.post("/login", login)

router.get("/getuser", getuser)


//Bus API
router.post("/createBus", createBus)
router.get("/getBus", getBus)

//Booking API

router.post("/createBooking",authentication, createBooking);

router.get('/getBooking/:bookingId',authentication, getBooking);


//Passenger API
router.post("/createPassenger",authentication,createPassenger)

module.exports = router