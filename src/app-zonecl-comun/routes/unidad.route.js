const express = require('express');
const { UnidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new UnidadController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodUnidad);
  
  return router;
};