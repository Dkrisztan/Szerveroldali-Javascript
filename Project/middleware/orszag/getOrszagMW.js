const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const OrszagModel = requireOption(objectrepository, 'OrszagModel');

  return function(req, res, next) {
    OrszagModel.findOne({ _id: req.params.orszagid }, (err, orszag) => {
      if (err || !orszag) {
        return next(err);
      }
      res.locals.orszag = orszag;
      return next();
    });
  };
};