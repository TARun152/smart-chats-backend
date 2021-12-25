const express=require('express')
const message=require('../models/Message')
const router=express.Router()
// new message
router.post('/',async (req,res)=>{
    const newMessage=new message(req.body)
    try {
        const savemsg=await newMessage.save()
        res.json(savemsg)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get all message of a convo
router.get('/:convoId',async(req,res)=>{
    try {
        const allmessage= await message.find({conversationId:req.params.convoId})
        res.json(allmessage)
    } catch (error) {
        res.json(error)
    }
})
module.exports=router;