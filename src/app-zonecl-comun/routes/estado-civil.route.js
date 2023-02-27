const express = require('express');
const { EstadoCivilController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EstadoCivilController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEstadoCivil);
  
  return router;
};