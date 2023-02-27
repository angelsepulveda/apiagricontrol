const express = require('express');
const { SexoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new SexoController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodSexo); 
  
  return router;
};