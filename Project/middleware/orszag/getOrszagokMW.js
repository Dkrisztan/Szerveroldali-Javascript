const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const OrszagModel = requireOption(objectrepository, 'OrszagModel');

  return function(req, res, next) {
    OrszagModel.find({}, (err, orszagok) => {
      if (err) {
        return next(err);
      }
      res.locals.orszagok = orszagok;
      return next();
    });
  };
};