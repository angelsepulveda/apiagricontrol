const express = require('express');
const { ContratistaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ContratistaController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodContratista);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
