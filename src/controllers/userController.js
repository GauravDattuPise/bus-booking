const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

let {isValidphone,isValidEmail, isValidBody, isValidName, checkSpaceBtwWord, isValidpassword} = require("../validator/validation")


exports.createUser = async(req,res)=>{
try {
    
        let {firstName, lastName, password,email,phone,gender, dob} = req.body

        if(Object.keys(req.body).length ==0) return res.status(400).send({ status: false, message: "body cant be empty" });

        // if (!isValidBody(firstName)) return res.status(400).send({ status: false, message: "Please provide your first name" });

    // firstName = checkSpaceBtwWord(firstName);

    if (!isValidName(firstName)) return res.status(400).send({ status: false, message: "First name should only contain alphabet" });

    if(!isValidBody(lastName)) return res.status(400).send({ status: false, message: "Please provide your first name" });

    lastName = checkSpaceBtwWord(lastName)

    if(!isValidName(lastName)) return res.status(400).send({ status: false, message: "Last name should only contain alphabet" });

    if (!isValidBody(email)) return res.status(400).send({ status: false, message: "email is required" });

    email = checkSpaceBtwWord(email);
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "please provide valid email" });

    // if (!isValidBody(phone)) return res.status(400).send({ status: false, message: "phone is required" });

  
    // if (!isValidphone(phone)) return res.status(400).send({ status: false, message: "please provide valid indian phone number", });

    if (!password) return res.status(400).send({ status: false, message: "password is required" });
    if (!isValidpassword(password)) return res.status(400).send({ status: false, message: "please provide valid password and password must contains minimum 8 characters and maximum 15 characters" });

    const DublicateEmailAndPhone = await userModel.findOne({$or:[{email:email},{phone:phone}]})

    if(DublicateEmailAndPhone){
        if(DublicateEmailAndPhone.email == email) return res.status(400).send({status:false, message: "email is already exist"})

        // if(DublicateEmailAndPhone.phone == phone) return res.status(400).send({status: false, message: "phone is alredy exist"})
    }

        let pwd = await bcrypt.hash(password,10)

        // let dobMoment = moment(dob).format('YYYY-MM-DD')

        let userData = {firstName:firstName,lastName:lastName,password:pwd,email:email,phone:phone,gender:gender,dob:dob}

        let saveData = await userModel.create(userData)

        return res.status(201).send({status:true,message:"user created successfully",data:saveData})
          
} catch (error) {

    res.status(500).send({status:false, message:error.message})

    console.log(error.message)
    
}
}

exports.login = async (req, res) => {
    try {

        let { email, password } = req.body

        if (!email || !password) return res.status(400).send({ status: false, message: "plz provide both email and password" })

        let findCredential = await userModel.findOne({ email : email})
        console.log(findCredential)
        if (!findCredential) return res.status(400).send({ status: false, message: "plz provide valid email or password" })

        let checkPass = await bcrypt.compare(password, findCredential.password);
console.log(checkPass)

        if (!checkPass) return res.status(400).send({ status: false, message: "password is incorrect" });


        let token = jwt.sign({ email: findCredential.email }, "prashant", {
            expiresIn: "1h"
        })

        return res.status(201).send({status:true, token:token })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.getuser = async(req,res) =>{
    try {
        let data = req.body
        let user = await userModel.find(data)
    
    return res.status(200).send({ status:true, data :user })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}