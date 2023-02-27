const express = require('express');
const { LocalidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new LocalidadController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodLocalidad);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
