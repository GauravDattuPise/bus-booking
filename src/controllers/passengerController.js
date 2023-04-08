const passengerModel = require('../models/passengerModel')


exports.createPassenger = async (req, res) => {
    try {
        const data = req.body;

        let saveData = await passengerModel.create(data)

        return res.status(201).send({ status: true, message: "passenger created successfully", data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
        console.log(error.message)

    }
};
