const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/QJBZPV', { useNewUrlParser: true });

module.exports = mongoose;