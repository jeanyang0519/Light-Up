const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  skills: {
    type: String,
    required: false
  },
  interests: {
    type: String,
    required: false
  },
  connections: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      _id: false,
      status: {
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

User = mongoose.model("User", UserSchema);

module.exports = User;
