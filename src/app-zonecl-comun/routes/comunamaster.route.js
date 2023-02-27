const express = require('express');
const { ComunaMasterController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ComunaMasterController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodComuna);
  router.get('/search/:id', controller.findByCodRegion);
  
  return router;
};