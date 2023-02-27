const express = require('express');
const { RegionMasterController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new RegionMasterController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodRegion);
  router.get('/search/:id', controller.findByCodPais);

  return router;
};
