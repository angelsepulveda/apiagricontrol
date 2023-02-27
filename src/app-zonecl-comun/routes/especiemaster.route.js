const express = require('express');
const { EspecieMasterController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EspecieMasterController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEspecie);
  
  return router;
};