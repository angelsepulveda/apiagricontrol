const express = require('express');
const { DireccionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new DireccionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodDireccion);

  return router;
};
