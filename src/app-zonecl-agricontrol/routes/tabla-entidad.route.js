const express = require('express');
const { TablaEntidadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TablaEntidadController();

  router.get('/', controller.findAll);

  return router;
};
