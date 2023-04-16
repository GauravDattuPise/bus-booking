const passengerModel = require('../models/passengerModel')


exports.createPassenger = async (req, res) => {
    try {
        const data = req.body;

        const  {name,age,phone , email, gender,city,state} = data

        if(Object.keys(data).length == 0){
            return res.status(400).send({status :false, message :"All fields are mandatory"})
        }

        if(!name)return res.state(400).send({status : false, message : "Name is mandatory"})
        if(!age)return res.state(400).send({status : false, message : "Age is mandatory"})
        if(!phone)return res.state(400).send({status : false, message : "Name is mandatory"})
        if(!email)return res.state(400).send({status : false, message : "Email is mandatory"})
        if(!gender)return res.state(400).send({status : false, message : "gender is mandatory"})
        if(!city)return res.state(400).send({status : false, message : "city is mandatory"})
        if(!state)return res.state(400).send({status : false, message : "state is mandatory"})

        let saveData = await passengerModel.create(data)

        return res.status(201).send({ status: true, message: "passenger created successfully", data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
        console.log(error.message)

    }
};
