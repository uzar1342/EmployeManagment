const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://arbazak:9768758031@cluster0.urzr7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;

