const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
  createdBy: mongoose.Schema.Types.ObjectId,
  
});

module.exports = mongoose.model('Employee', employeeSchema);
