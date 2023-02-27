const express = require('express');
const { UnidadMedidaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new UnidadMedidaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodUnidadMedida);

  return router;
};