const express = require('express');
const { PaisController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new PaisController();

  router.get('/find-select', controller.findSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodPais);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);

  return router;
};
