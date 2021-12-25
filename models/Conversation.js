const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const conversationSchema = new mongoose.Schema({
  members:{
      type: Array
  }
},{ timestamps: true });
let conversation = mongoose.model('conversation', conversationSchema);
module.exports = conversation;