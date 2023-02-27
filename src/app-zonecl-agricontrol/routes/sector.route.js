const express = require('express');
const { SectorController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new SectorController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodSector);
  router.get('/campos/:id', controller.findByCodCampo);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
