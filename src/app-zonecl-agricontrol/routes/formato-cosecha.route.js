const express = require('express');
const { FormatoCosechaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new FormatoCosechaController();

  router.get('/campos', controller.findByFormatoCosechaCampos);
  router.get('/campos-all/:id', controller.formatoCosechasCamposAll);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodFormatoCosecha);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
