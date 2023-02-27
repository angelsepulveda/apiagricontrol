const express = require('express');
const { CajaCompensacionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CajaCompensacionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCajaCompensacion);

  return router;
};
