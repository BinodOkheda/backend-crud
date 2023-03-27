const express = require("express");
const app = express();
const  jwt = require('jsonwebtoken');
const userRoute = express.Router();
app.use(express.json());
const bcrypt = require('bcrypt');
require("dotenv").config()
const {UserModel} = require("../models/user.model")



userRoute.post("/register",async (req,res)=>{

    const { username , email , password} = req.body;
    const hash = bcrypt.hashSync( password, 5 );

  try {
    const user = new UserModel({username,email,password:hash})
    await user.save()
    res.send("User has been added...!!")
  } catch (error) {
    console.log(error.message)
  }


})

userRoute.post("/login",async (req,res)=>{
    const {email , password}= req.body
try {
    const user =await UserModel.findOne({email})
    
    const hash = user.password;
    const compared=bcrypt.compareSync(password, hash)
    
    if(compared){

        res.send({user , token:jwt.sign( { userID:user._id } , process.env.secretKey)})
        
    }else{
        res.send("Incorrect Password")
    }
 } catch (error) {
    res.send(error.message)
 }

})


module.exports = {userRoute}