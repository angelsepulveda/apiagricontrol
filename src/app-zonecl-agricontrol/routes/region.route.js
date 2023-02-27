const express = require('express');
const { RegionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new RegionController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodRegion);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);

  return router;
};
