const express = require('express');
const { TipoRecoleccionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TipoRecoleccionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTipoRecoleccion);
  return router;
};