const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const LatnivaloModel = requireOption(objectrepository, 'LatnivaloModel');
  
  return (req, res, next) => {
    
    if (typeof req.body.nev === 'undefined' || typeof res.locals.orszag === 'undefined') {
      return next();
    }

    if (typeof res.locals.latnivalo === 'undefined') {
      res.locals.latnivalo = new LatnivaloModel();
    }

    console.log(res.locals.latnivalo.nev);
    console.log(req.body.nev);

    res.locals.latnivalo.nev = req.body.nev;
    res.locals.latnivalo._orszag = res.locals.orszag._id;


    res.locals.latnivalo.save(err => {
      if (err) {
        return next(err);
      }
      return res.redirect(`/latnivalo/${res.locals.orszag._id}`);
    });
  };
};