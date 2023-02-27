const express = require('express');
const { ProduccionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ProduccionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodProduccion);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};