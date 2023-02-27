const express = require('express');
const { VariedadController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new VariedadController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodVariedad);
  router.get('/especies/:id', controller.findByCodEspecie);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);

  return router;
};
