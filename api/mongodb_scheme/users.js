const mongoose = require('mongoose');

let counter = 0;
const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    require: true,
    default: () => counter++,
  },
  username: {
    type: String,
    require: true,
    maxLength: 100,
  },
  email: {
    type: String,
    require: true,
    maxLength: 100,
  },
  password: {
    type: String,
    require: true,
  },
  signup_date: {
    type: String,
    require: true,
  },
  permission: {
    type: Boolean,
    require: true,
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
