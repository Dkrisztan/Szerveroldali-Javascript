const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  const OrszagModel = requireOption(objectrepository, 'OrszagModel');
  return (req, res, next) => {
    
    if (
      typeof req.body.nev === 'undefined' ||
      typeof req.body.szuvenir === 'undefined' ||
      typeof req.body.rating === 'undefined'
    ) {
      return next();
    }

    if (typeof res.locals.orszag === 'undefined') {
        res.locals.orszag = new OrszagModel();
    }

    if (Number.isNaN(parseInt(req.body.rating, 10))) {
      return next(new Error('A ratinget számmal add meg!'));
    } else if (req.body.rating < 1 ) {
      return next(new Error('A rating 1 vagy annál nagyobb kell legyen!'));
    } else if (req.body.rating > 5) {
      return next(new Error('A rating 5 vagy annál kisebb kell legyen!'));
    }

    res.locals.orszag.nev = req.body.nev;
    res.locals.orszag.szuvenir = req.body.szuvenir;
    res.locals.orszag.rating = req.body.rating;

    res.locals.orszag.save(err => {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
    });
  };
};