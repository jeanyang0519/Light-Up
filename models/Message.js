const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
