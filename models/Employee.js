const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
  createdBy: String,
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
