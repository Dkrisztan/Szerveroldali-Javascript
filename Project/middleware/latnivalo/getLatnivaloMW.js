const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const LatnivaloModel = requireOption(objectrepository, 'LatnivaloModel');
  
  return function(req, res, next) {
    LatnivaloModel.findOne(
      {
        _id: req.params.latnivaloid
      },
      (err, latnivalo) => {
        if (err || !latnivalo) {
            return next(err);
        }
        res.locals.latnivalo = latnivalo;
        return next();
      }
    );
  };
};