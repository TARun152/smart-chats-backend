const express=require('express')
const conversation=require('../models/Conversation')
const router=express.Router()
// new convo
router.post('/',async (req,res)=>{
    const newConversation=new conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const saveconvo=await newConversation.save()
        res.json(saveconvo)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get a convo
router.get('/:userId',async(req,res)=>{
    try {
        const convo= await conversation.find({members: {$in:[req.params.userId]}})
        res.json(convo)
    } catch (error) {
        res.json(error)
    }
})
// get a convo between 2 users
router.get('/:firstId/:secondId',async(req,res)=>{
    try {
        const convo= await conversation.findOne({members: {$all:[req.params.firstId,req.params.secondId]}})
        if(convo)
        res.json(convo)
        else{
            res.send("no convo")
        }
    } catch (error) {
        res.json(error)
    }
})
module.exports=router;