const express = require('express');
const { CuartelVariedadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CuartelVariedadController();

  router.get('/find-select/:id', controller.findByCodCuartelSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCuartel);

  return router;
};
