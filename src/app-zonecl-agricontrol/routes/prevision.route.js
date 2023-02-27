const express = require('express');
const { PrevisionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new PrevisionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodPrevision);

  return router;
};
