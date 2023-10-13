const router = require("../routes/userRoutes");
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler');
const generateToken = require("../utils/generateTokens");

const registerUser=async(req,res)=>{
    const{name,email,password,pic}=req.body;

   const userExist=await User.findOne({email});
   
   if(userExist){
    res.status(400).json({error:"User Already Exist"});

   }

   const user=await User.create({
    name,
    email,password,pic,
   });

   if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
        
    });

   }
   else{
    res.status(400).json({error:'Error Occured!'});
   }

   
   
};

const authUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json(
           { _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        }
        )
    }
    else{
        res.status(400).json({error:'Invalid Email or password'});
       }
   
   
});

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email;

        if(req.body.password){

            const isPasswordMatch = await user.matchPassword(req.body.password);

      if (!isPasswordMatch) {
        res.status(400).json({ error: 'Password does not match.' });
        return;
      }

            user.password=req.body.password;
        }
        const updatedUser=await user.save();

        res.json({
            id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            pic:updatedUser.pic,
            token:generateToken(updatedUser._id)
            

        })
    }
    else{
        res.status(404)
        res.status(400).json({error:'User not found'});
    }
})

module.exports={registerUser,authUser,updateUserProfile}

