const express = require('express');
const { UserController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new UserController();

  router.get('/', controller.findAll);
  router.get('/campos', controller.findAllUserCampo);
  router.get('/:userId', controller.findByUserId);
  router.post('/', controller.create);
  router.put('/:userId', controller.update);
  router.delete('/:userId', controller.delete);

  return router;
};