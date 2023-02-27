const express = require('express');
const { CuadrillaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CuadrillaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCuadrilla);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};