const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Orszag = db.model('Orszag', {
  nev: String,
  szuvenir: String,
  rating: Number
});

module.exports = Orszag;