const express = require('express');
const { ComunaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ComunaController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodComuna);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);

  return router;
};
