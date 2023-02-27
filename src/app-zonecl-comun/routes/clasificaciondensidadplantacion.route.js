const express = require('express');
const { ClasificacionDensidadPlantacionController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new ClasificacionDensidadPlantacionController();

  router.get('/', controller.findAll);
  router.get('/:id', controller.findByCodClasificacionDensidad);
  
  return router;
};