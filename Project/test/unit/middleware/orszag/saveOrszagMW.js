var expect = require('chai').expect;
var saveOrszagMW = require('../../../../middleware/orszag/saveOrszagMW');

describe('saveOrszagMW MWtest', function() {
  it('should set res.locals.orszag', function(done) {
    const mw = saveOrszagMW({
      OrszagModel: 'orszag'
    });

    mw({
      body: {
        nev: 'MO',
        szuvenir: 'pálinka',
        rating: '4'
      },
      params: {
        orszagid: '13'
      }
    },{   
      locals: {
        orszag: {
          _id: 'orszagid'
        },
        orszag: {
          save(cb) {
            cb(null);
          }
        }
      },
      redirect: (where) => {
        expect(where).to.be.eql('/');
        done();
      }
    },(err) => {

    });
  });

  it('should call next if error occurs when saving', function(done) {
    const mw = saveOrszagMW({
      OrszagModel: 'orszag'
    });

    mw({
      body: {
        nev: 'MO',
        szuvenir: 'pálinka',
        rating: '4'
      },
      params: {
        orszagid: '13'
      }
    },{   
      locals: {
        orszag: {
          _id: 'orszagid'
        },
        orszag: {
          save(cb) {
            cb('hiba');
          }
        }
      },
      redirect: (where) => {
      }
    },(err) => {
      expect(err).to.be.eql('hiba');
      done();
    });
  });

  it('should call next if error occurs with rating', function(done) {
    const mw = saveOrszagMW({
      OrszagModel: 'orszag'
    });

    mw({
      body: {
        nev: 'MO',
        szuvenir: 'pálinka',
        rating: 'negy'
      },
      params: {
        orszagid: '13'
      }
    },{   
      locals: {
        orszag: {
          _id: 'orszagid'
        },
        orszag: {
          save(cb) {
            cb(null);
          }
        }
      },
      redirect: (where) => {
      }
    },(err) => {
      expect(err).to.be.instanceOf(Error);
      expect(err.toString()).to.be.oneOf(['Error: A ratinget számmal add meg!', 'Error: A rating 1 vagy annál nagyobb kell legyen!', 'Error: A rating 5 vagy annál kisebb kell legyen!']);
      done();
    });
  });
});