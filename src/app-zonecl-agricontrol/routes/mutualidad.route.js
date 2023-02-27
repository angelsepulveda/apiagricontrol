const express = require('express');
const { MutualidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new MutualidadController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodMutualidad);
  
  return router;
};
