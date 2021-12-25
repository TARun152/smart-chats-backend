const express=require('express')
const post =require('../models/Post')
const user =require('../models/User')
const router=express.Router()
// create a post
router.post('/',async (req,res)=>{
    try {
        const newpost= new post(req.body)
        await newpost.save();
        res.json(newpost)
    } catch (error) {
        res.json(error)
    }
})
// update a post
router.put('/:id',async (req,res)=>{
    try {
        const newpost= await post.findById({_id:req.params.id})
        if(newpost.userId===req.body.userId)
        {
            await newpost.updateOne({$set:req.body})
            res.status(200).send("successfully updated")
        }
        else
        {
            res.send("cannot be updated")
        }
    } catch (error) {
        res.json(error)
    }
})
// delete a post
router.delete('/:id',async (req,res)=>{
    try {
        const newpost= await post.findById({_id:req.params.id})
            await newpost.deleteOne()
            res.status(200).send("successfully deleted")
    } catch (error) {
        res.json(error)
    }
})
// like and dislike a post
router.put('/:id/like',async (req,res)=>{
    try {
        const newpost= await post.findById({_id:req.params.id})
        if(!newpost.likes.includes(req.body.userId))
        {
            await newpost.updateOne({$push: {likes:req.body.userId}})
            res.send("liked")
        }
        else
        {
            await newpost.updateOne({$pull: {likes:req.body.userId}})
            res.send("disliked")
        }
    } catch (error) {
        res.json(error)
    }
})
// get a post
router.get('/:id',async (req,res)=>{
    try {
        const newpost= await post.findById(req.params.id)
        res.send(newpost)
    } catch (error) {
        res.json(error)
    }
})
// all post of a user
router.get('/all/:userId',async (req,res)=>{
    try {
        const curruser= await user.findById(req.params.userId)
        // curruser posts
        const postarray= await post.find({userId:curruser._id})
        res.status(200).json(postarray)
    } catch (error) {
        res.json(error)
    }
})
// timeline
router.get('/timeline/:userId',async (req,res)=>{
    try {
        const curruser= await user.findById(req.params.userId)
        // curruser posts
        const postarray= await post.find({userId:curruser._id})
        // all friends posts
        const friendposts= await Promise.all(curruser.following.map((friendId)=>{
            return post.find({userId:friendId})
        }))
        res.status(200).json(postarray.concat(...friendposts))
    } catch (error) {
        res.json(error)
    }
})

module.exports=router;