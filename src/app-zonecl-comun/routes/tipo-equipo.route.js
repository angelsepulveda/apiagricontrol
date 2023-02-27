const express = require('express');
const { TipoEquipoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TipoEquipoController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTEquipo); 
  
  return router;
};