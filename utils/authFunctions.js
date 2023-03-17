const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('../config.json');
const express = require('express');
const { findUserById } = require('../controllers/userControllers');

const createToken = async (user) => {
    console.log(user);
    
    let token = jwt.sign({
        ...user
    },
    config.jwt.secret,
    { expiresIn : 86400 }); //24 hrs
    
    
    return token;
}

const passwordEncryption = async(password) => {
    console.log(password);
    const hashedPassword = bcryptjs.hashSync(password,8);
    return hashedPassword;
}

// const verifyToken = (req,res,next) =>{
//     console.log("hit");
//     console.log(req.headers);
//     if(!req.headers.authorization){
//         return res.status(401).send("User unauthorized");
//     }
//     // Bearer Token...
//     console.log(req.headers);
//     const token = req.headers.authorization.split(' ')[1];

//     console.log(token);
//     if(!token||token==="null"){
//         return res.status(401).send("User unauthorized");
//     }
//     try{
//         console.log("hit2");
//         let payload = jwt.verify(token, config.jwt.secret);
//         console.log("hit3");
//         if(!payload){
//             return res.status(401).send("User unauthorized");
//         }
//         console.log("--------->"+payload);
//         req.userId = payload.subject;
//         next();
//     }
//     catch(error){

//         return res.status(201).send(error);
//     }
    
// }

const isAuthenticated = (req) =>{
    
    try{
        const token = req.cookies.jwt;
        console.log(token);
        if(token){
            const verifyUser = jwt.verify(token, config.jwt.secret)
            verifyUser._doc.password = "";
            return verifyUser._doc;
        } 
    }catch(e){
        console.log(e);
    }

}
const auth = async(req,res,next) => {
    try{
        const token = req.cookies.jwt;
        console.log(token);
        if(token){
            const verifyUser = jwt.verify(token, config.jwt.secret)
            console.log(verifyUser)
            // check whether user exists in a database
            let instance = await findUserById({_id : verifyUser._doc._id});
            if(instance._id){
                next();
            }
            
        }  
       
    }catch(e){
        console.log(e);
    }

    
}
exports.createToken = createToken;
exports.passwordEncryption = passwordEncryption;
// exports.verifyToken = verifyToken;
exports.isAuthenticated = isAuthenticated;
exports.auth = auth;