const express = require('express');
const { CampoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CampoController();

  router.get('/find-select', controller.findSelect);
  router.get('/select', controller.findAllSelect);
  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodCampo);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
