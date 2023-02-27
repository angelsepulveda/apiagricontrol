const express = require('express');
const { CalidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CalidadController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCalidad);
  router.put('/:id', controller.update);

  return router;
};
