const busModel  = require('../models/busModel');

exports.createBus = async (req, res) => {

    try {
        let saveData = await busModel.create(req.body)
        return res.status(201).send({status: true, data:saveData, message: "bus crested successfully"})
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.getBus = async (req, res)=> {
    try {
        let {startCity, destination, availableDates}= req.query
        let busData = await busModel.find({'startCity': startCity, 'destination': destination , 'availableDates':availableDates ,availableSeats: { $gt: 0 }})
        
        if(busData.length==0){
            return  res.status(404).send({status:false, message: "bus  is not available"})
        }
        return  res.status(200).send({status:true, data:busData})
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}




