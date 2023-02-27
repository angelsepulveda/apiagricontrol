const express = require('express');
const { TrabajadorController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new TrabajadorController();

  router.get('/find-select/:id', controller.findByCodTrabajadorSelect);
  router.get('/actives/:id', controller.findTrabajadoresActivos);
  router.get('/cuadrillas/:id', controller.findByCodCuadrilla);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodTrabajador);
  router.post('/', controller.create);
  router.post('/carga-masiva', controller.createMasivo);
  router.put('/carga-masiva', controller.updateMasivo);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
