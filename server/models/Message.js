const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
   Chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text','file'],
    default: 'text'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'messages'
});
messageSchema.index({room:1,timestamp:-1})
const MessageModel = mongoose.model('Message', messageSchema);
module.exports = MessageModel;
