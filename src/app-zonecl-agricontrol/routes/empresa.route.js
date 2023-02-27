const express = require('express');
const { EmpresaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new EmpresaController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodEmpresa);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
