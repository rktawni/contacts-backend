const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const getCurrentUser = expressAsyncHandler(async (req, res) =>{
    res.status(200).json({message:'Current User Information'});
});

const registerUser = expressAsyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("username, email and password are mendatory!")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
    res.status(201).json({_id:user.id, email:user.email})
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
   
})
const login = expressAsyncHandler(async(req, res)=>{
    res.status(200).json({message:'User logged in successfully!'})
})

module.exports = {
    getCurrentUser,
    login,
    registerUser
};