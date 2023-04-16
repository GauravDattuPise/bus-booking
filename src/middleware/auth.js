const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');

exports.authentication = async (req,res,next) =>{

    let token = req.headers['token'];
    console.log(token, '12211')

    if(!token){
        return res.status(400).send({status : false, message : "token is required"});
    }

    jwt.verify(token, "prashant", (err,tokenVerified)=>{
        if(err){
            return res.status(400).send({status : false, message:err.message})
        }
         else{
            req.userId = tokenVerified.userId

            req.headers['decodedToken'] = tokenVerified
        //    console.log( tokenVerified.userId, "ooooo")
            next();
         } 
    })
}

exports.authorization = async (req,res,next) =>{
    let token = req.headers['decodedToken'];

    let findUser = await userModel.findOne({email : token});

    if(!findUser){
        return res.status(404).send({status : false, message : "User not found"})
    }

    next();
}