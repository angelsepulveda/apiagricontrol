const { ClasificacionDensidadPlantacionService } = require('../services');

class ClasificacionDensidadPlantacionController {
  async findAll(req, res, next) {
    try {
      const service = new ClasificacionDensidadPlantacionService({ lng: req.t });
      const clasificaciones = await service.findAll();
      res.status(200).json(clasificaciones);
    } catch (e) {
      next(e);
    }
  }

  async findByCodClasificacionDensidad(req, res, next) {
    try {
      const { id } = req.params;
      const service = new ClasificacionDensidadPlantacionService({ lng: req.t });
      const clasificar = await service.findByCodClasificacionDensidad({ cod: id });
      res.status(200).json(clasificar);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = ClasificacionDensidadPlantacionController;
