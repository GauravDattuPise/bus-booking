const express = require('express')
const router = express.Router()

const {createUser, login, getuser} = require("../controllers/userController")
const {createBus,  getBus} = require("../controllers/busController")

router.post("/createUser", createUser)
router.post("/login", login)

router.get("/getuser", getuser)


//Bus API
router.post("/createBus", createBus)
router.get("/getBus", getBus)

module.exports = router