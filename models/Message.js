const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const messageSchema = new mongoose.Schema({
  conversationId:{
      type: String
  },
  sender:{
    type: String
},
text:{
    type: String
}
},{ timestamps: true });
let message = mongoose.model('message', messageSchema);
module.exports = message;