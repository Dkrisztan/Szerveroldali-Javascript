const renderMW = require('../middleware/renderMW');

const OrszagModel = require('../models/orszag');
const LatnivaloModel = require('../models/latnivalo');

// Orszagok
const deleteOrszagMW = require('../middleware/orszag/deleteOrszagMW');
const getOrszagokMW = require('../middleware/orszag/getOrszagokMW');
const getOrszagMW = require('../middleware/orszag/getOrszagMW');
const saveOrszagMW = require('../middleware/orszag/saveOrszagMW');

// Latnivalok
const deleteLatnivaloMW = require('../middleware/latnivalo/deleteLatnivaloMW');
const getLatnivalokMW = require('../middleware/latnivalo/getLatnivalokMW');
const getLatnivaloMW = require('../middleware/latnivalo/getLatnivaloMW');
const saveLatnivaloMW = require('../middleware/latnivalo/saveLatnivaloMW');

module.exports = function(app) {
  
  const objRepo = {
    OrszagModel: OrszagModel,
    LatnivaloModel: LatnivaloModel
  };

  app.use(
    '/orszag/new',
    saveOrszagMW(objRepo),
    renderMW(objRepo, 'neworszag')
  );

  app.use(
    '/orszag/:orszagid/edit',
    getOrszagMW(objRepo),
    saveOrszagMW(objRepo),
    renderMW(objRepo, 'editorszag')
  );

  app.get(
    '/orszag/:orszagid/delete',
    getOrszagMW(objRepo),
    deleteOrszagMW(objRepo)
  );

  app.use(
    '/latnivalo/:orszagid/new',
    getOrszagMW(objRepo),
    saveLatnivaloMW(objRepo),
    renderMW(objRepo, 'newlatnivalo')
  );

  app.use(
    '/latnivalo/:orszagid/edit/:latnivaloid',
    getOrszagMW(objRepo),
    getLatnivaloMW(objRepo),
    saveLatnivaloMW(objRepo),
    renderMW(objRepo, 'editlatnivalo')
  );

  app.get(
    '/latnivalo/:orszagid/delete/:latnivaloid',
    getOrszagMW(objRepo),
    getLatnivaloMW(objRepo),
    deleteLatnivaloMW(objRepo),
    renderMW(objRepo, 'latnivalo')
  );

  app.use(
    '/latnivalo/:orszagid',
    getOrszagMW(objRepo),
    getLatnivalokMW(objRepo),
    saveLatnivaloMW(objRepo),
    renderMW(objRepo, 'latnivalo')
  );

  app.use('/', getOrszagokMW(objRepo), renderMW(objRepo, 'index'));
};