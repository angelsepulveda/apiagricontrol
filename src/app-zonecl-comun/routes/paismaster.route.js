const express = require('express');
const { PaisMasterController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new PaisMasterController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodPais);
  
  return router;
};