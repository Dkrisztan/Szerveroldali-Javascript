const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  return function(req, res, next) {
    if (typeof res.locals.latnivalo === 'undefined') {
      return next();
    }
    res.locals.latnivalo.remove(err => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/latnivalo/${res.locals.orszag._id}`);
    });
  };
};