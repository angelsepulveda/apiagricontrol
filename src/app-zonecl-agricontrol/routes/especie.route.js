const express = require('express');
const { EspecieController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EspecieController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEspecie);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);

  return router;
};
