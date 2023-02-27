const express = require('express');
const { HileraController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new HileraController();

  router.get('/', controller.findAll);
  router.get('/find', controller.findByCodHileraCampoSectorCuartelVariedad);
  router.post('/', controller.create);
  router.put('/', controller.update);
  router.delete('/', controller.delete);

  return router;
};
