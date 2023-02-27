const express = require('express');
const { BinsController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new BinsController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodBins);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
};