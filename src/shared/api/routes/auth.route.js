const express = require('express');
const { AuthController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new AuthController();

  router.post('/', controller.login);

  return router;
};
