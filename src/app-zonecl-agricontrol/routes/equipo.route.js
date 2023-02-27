const express = require('express');
const { EquipoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EquipoController();

  router.get('/find-select', controller.findSelect);
  router.get('/actives', controller.findEquiposActivos);
  router.get('/jefeCuadrilla/:id', controller.findByCodEquipoJefe);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEquipo);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
