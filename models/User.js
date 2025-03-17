const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type:String, unique: true, required:[true,'User name is required']},
  password: String,
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

