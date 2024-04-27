const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    const secretKey = 'swetha123'; 
    return jwt.sign({id},secretKey,{
        expiresIn:"30d",
    })
}

module.exports=generateToken;