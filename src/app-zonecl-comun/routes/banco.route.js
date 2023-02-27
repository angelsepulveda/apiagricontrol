const express = require('express');
const { BancoController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new BancoController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodBanco);

  return router;
};