const express = require('express');
const { TratoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TratoController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTrato);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};