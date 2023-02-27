const express = require('express');
const { TipoCoberturaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TipoCoberturaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTCobertura); 
  
  return router;
};