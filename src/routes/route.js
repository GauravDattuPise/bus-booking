const express = require('express')
const router = express.Router()

const {createUser, login, getuser} = require("../controllers/userController")

router.post("/createUser", createUser)
router.post("/login", login)

router.get("/getuser", getuser)

module.exports = router