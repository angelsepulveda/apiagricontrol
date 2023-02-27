const express = require('express');
const { FuncionalidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new FuncionalidadController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodFuncionalidad);
  
  return router;
};