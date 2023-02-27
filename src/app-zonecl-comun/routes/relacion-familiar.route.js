const express = require('express');
const { RelacionFamiliarController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new RelacionFamiliarController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodRelacionFamiliar);
  
  return router;
};