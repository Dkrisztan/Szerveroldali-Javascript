var expect = require('chai').expect;
var getOrszagMW = require('../../../../middleware/orszag/getOrszagMW');

describe('getOrszagMW MWtest', function() {
  it('should set res.locals.orszag', function(done) {
    const mw = getOrszagMW({
      OrszagModel: {
        findOne: (p1,cb) => {
          expect(p1).to.be.eql({_id: '13'})
          cb(null, 'mockOrszag');
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params: {
        orszagid: '13'
      }
    },
    resMock,(err) => {
      expect(err).to.be.eql(undefined);
      expect(resMock.locals).to.be.eql({orszag: 'mockOrszag'});
      done();
    });
  });

  it('should call next when database error occurs', function(done) {
    const mw = getOrszagMW({
      OrszagModel: {
        findOne: (p1,cb) => {
          expect(p1).to.be.eql({_id: '13'})
          cb('An Error Occured', null);
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params: {
        orszagid: '13'
      }
    },
    resMock,(err) => {
      expect(err).to.be.eql('An Error Occured');
      done();
    });
  });

  it('should call next when database is empty', function(done) {
    const mw = getOrszagMW({
      OrszagModel: {
        findOne: (p1,cb) => {
          expect(p1).to.be.eql({_id: '13'})
          cb(undefined, null);
        }
      }
    });

    const resMock = {
      locals: {}
    };

    mw({
      params: {
        orszagid: '13'
      }
    },
    resMock,(err) => {
      expect(err).to.be.eql(undefined);
      expect(resMock.locals).to.be.eql({});
      done();
    });
  });
});