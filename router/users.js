const express=require('express')
const user =require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router=express.Router()
//   updating a user
  router.put('/:id',async (req, res)=> {
    //   first change the password which is coming from req.body into a hash password
    if(req.body.password)
    {
        try{
        req.body.password= await bcrypt.hash(req.body.password,10)
        } catch(error){
            res.send("password not updated")
        }
    }
    // then update entire body
    try {
        await user.findByIdAndUpdate(req.params.id,{$set:req.body})
        console.log("ok")
        res.send("successfully updated")
    } catch (error) {
        return res.send("not updated")
    }
  })
// delete a user
router.delete('/:id',async (req, res)=> {
    try {
        await user.deleteOne({_id:req.params.id})
        res.send("succesfully delted")
    } catch (error) {
        return res.send("not deleted")
    }
  })
// get a user
router.get('/:id',async (req, res)=> {
    try {
        const newuser =await user.findById(req.params.id)
        // used to remove password and updatedAt from sending in json 
        const {password,updatedAt,...other}=newuser._doc
    res.json(other)
    } catch (error) {
        return res.send("user not found")
    }
  })
//   get user by name
router.get('/name/:username',async (req, res)=> {
    try {
        const newuser =await user.findOne({name:req.params.username})
        // used to remove password and updatedAt from sending in json 
        const {password,updatedAt,...other}=newuser._doc
    res.json(other)
    } catch (error) {
        return res.send("user not found")
    }
  })
//   users follow
router.put('/:id/follow',async (req, res)=> {
    try {
        // body.id is trying to follow params.id
        if(req.params.id!==req.body.userId)
        {
            const userfollowed= await user.findById(req.params.id)
            const userfollowing= await user.findById(req.body.userId)
            if(userfollowing&&userfollowed)
            {
                if(!userfollowed.followers.includes(req.body.userId))
                {
                    // push id in array
                    await userfollowed.updateOne({$push:{followers:req.body.userId}})
                    await userfollowing.updateOne({$push:{following:req.params.id}})
                    res.send("you are following")
                }
                else
                {
                    res.send("already following")
                }
            }
            else{
                res.send("user don't exist")
            }
        }
        else
        {
            return res.send("you can't follow yourself")
        }
    } catch (error) {
        return res.send("user not found")
    }
  })
//   user unfollows
router.put('/:id/unfollow',async (req, res)=> {
    try {
        // body.id is trying to follow params.id
        if(req.params.id!==req.body.userId)
        {
            const userfollowed= await user.findById(req.params.id)
            const userfollowing= await user.findById(req.body.userId)
            if(userfollowing&&userfollowed)
            {
                if(userfollowed.followers.includes(req.body.userId))
                {
                    // push id in array
                    await userfollowed.updateOne({$pull:{followers:req.body.userId}})
                    await userfollowing.updateOne({$pull:{following:req.params.id}})
                    res.send("you are unfollowing")
                }
                else
                {
                    res.send("already unfollowing")
                }
            }
            else{
                res.send("user don't exist")
            }
        }
        else
        {
            return res.send("you can't unfollow yourself")
        }
    } catch (error) {
        return res.send("user not found")
    }
  })
// get user by name
router.get('/find/:username',async (req, res)=> {
    try {
        const newuser =await user.findOne({name:req.params.username})
        // used to remove password and updatedAt from sending in json 
        const {password,updatedAt,...other}=newuser._doc
    res.json(other)
    } catch (error) {
        return res.send("user not found")
    }
  })
  router.get('/',async (req, res)=> {
    try {
        const newuser =await user.find()
    res.json(newuser)
    } catch (error) {
        return res.send("user not found")
    }
  })
module.exports=router