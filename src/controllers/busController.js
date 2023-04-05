const busModel  = require('../models/busModel');


// router.get('/', (req, res) => {
//     bus.find({ companyName, startCity, totalseats, availableseats }, (err, result) => {
//         if (err) res.send(err)
//         else res.json({ result })
//     })
// })

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
        let {startCity, destination}= req.query
        let busData = await busModel.find({'startCity': startCity, 'destination': destination , availableSeats: { $gt: 0 }})
        
        if(busData.length==0){
            return  res.status(404).send({status:false, message: "bus route not available"})
        }
        return  res.status(200).send({status:true, data:busData})
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



// router.post('/', (req, res) => {

//     bus.find({ 'startCity': req.body.startCity, 'destination': req.body.destination }).exec((err, bus) => {
//         if (err) {
//             res.json({ status: false, message: "error while searching" })
//         }
//         else res.json({ bus })
//     })
// })

// router.post('/', (req, res) => {

//     bus.findOne({ _id: req.body.bId }, (err, bus) => {
//         if (err) {
//             res.json({ status: false, message: "error while searching with ID" })
//         }
//         else
//             res.json({ bus })
//     })
// })

// // router.post('/', (req, res) => {
// //     let newBus = new bus(req.body)
// //     newBus.save((err, bus) => {
// //         if (err) console.log(err)
// //         else res.status(201).json(bus)
// //     })
// // })
