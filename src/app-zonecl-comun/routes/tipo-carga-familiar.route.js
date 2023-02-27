const express = require('express');
const { TipoCargaFamiliarController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TipoCargaFamiliarController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTCargaFamiliar);
  
  return router;
};