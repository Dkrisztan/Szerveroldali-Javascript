const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const LatnivaloModel = requireOption(objectrepository, 'LatnivaloModel');

  return function(req, res, next) {
    if (typeof res.locals.orszag === 'undefined') {
        return next();
    }
    LatnivaloModel.find({ _orszag: res.locals.orszag._id }, (err, latnivalok) => {
      if (err) {
          return next(err);
      }
      res.locals.latnivalok = latnivalok;
      return next();
    });
  };
};