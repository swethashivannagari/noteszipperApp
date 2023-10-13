const jwt=require('jsonwebtoken')
require('dotenv').config()

const generateToken=(id)=>{
    const secretKey = process.env.JWT_SECRET; 
    return jwt.sign({id},secretKey,{
        expiresIn:"30d",
    })
}

module.exports=generateToken;