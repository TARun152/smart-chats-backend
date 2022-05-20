require('dotenv').config();
const express=require('express')
const { body, validationResult } = require('express-validator');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router=express.Router()
const user =require('../models/User')
  // user signing in 
router.post('/'
  ,async (req, res)=> {
    // using bcrypt to hash
    var user1= await user.findOne({name:req.body.name})
    if(user1)
      return res.json({msg:"User already exist with this name"})
    var user2= await user.findOne({email:req.body.email})
      if(user2)
        return res.json({msg:"User already exist with this email"})
    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.cpassword = await bcrypt.hash(req.body.cpassword, 10)
    var member=new user(req.body)
    let newMember=await member.save()
    let webtoken= jwt.sign({ _id: newMember._id }, process.env.SECRET_KEY)
    res.status(200).json({token:webtoken})
  })
  // user login 
  router.post('/login'
  ,async (req, res)=> {
    // usign try catch to find the user with the email
      var user1= await user.findOne({email:req.body.email})
      if(!user1)
      {
      return res.json({ msg: "invalid email or password" })
      }
    var istrue = await bcrypt.compare(req.body.password,user1.password)
    if(!istrue)
    {
      return res.json({ msg: "invalid email or password" })
    }
      // creating jwt token
    let webtoken= jwt.sign({ _id: user1._id }, process.env.SECRET_KEY)
    res.status(200).json({user:user1,token:webtoken})
  })
// verifying a user
router.get('/verify',(req,res)=>{
  try{
  const authtoken= req.headers.token
  let user= jwt.verify(authtoken,process.env.SECRET_KEY)
  res.json(user)
  }catch(error)
  {
    res.json(error)
  }
})
module.exports=router
