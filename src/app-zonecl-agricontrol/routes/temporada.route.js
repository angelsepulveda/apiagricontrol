const express = require('express');
const { TemporadaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TemporadaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTemporada);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
