const express = require('express');
const { MonedaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new MonedaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodMoneda);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
