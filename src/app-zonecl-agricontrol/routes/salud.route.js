const express = require('express');
const { SaludController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new SaludController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodSalud);

  return router;
};
