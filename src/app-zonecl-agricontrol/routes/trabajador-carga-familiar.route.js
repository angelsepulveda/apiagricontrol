const express = require('express');
const { TrabajadorCargaFamiliarController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TrabajadorCargaFamiliarController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTrabajadorCargaFamiliar);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
