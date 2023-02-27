const express = require('express');
const { VariedadMasterController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new VariedadMasterController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodVariedad);
  router.get('/search/:id', controller.findByCodEspecie);

  return router;
};
