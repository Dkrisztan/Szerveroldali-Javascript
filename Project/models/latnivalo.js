const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Latnivalo = db.model('Latnivalo', {
  nev: String,
  _orszag: {
    type: Schema.Types.ObjectId,
    ref: 'Orszag'
  }
});

module.exports = Latnivalo;