const express = require('express');
const { CuartelController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CuartelController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCuartel);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
