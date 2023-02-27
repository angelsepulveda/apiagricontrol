const express = require('express');
const { ProductorController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ProductorController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodProductor);
  
  return router;
};