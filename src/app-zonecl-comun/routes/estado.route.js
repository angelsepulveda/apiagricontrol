const express = require('express');
const { EstadoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EstadoController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEstado);
  
  return router;
};