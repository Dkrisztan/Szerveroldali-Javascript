const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

  return function(req, res, next) {
    
    if (typeof res.locals.orszag === 'undefined') {
      return next();
    }
    
    res.locals.orszag.remove(err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  };
};