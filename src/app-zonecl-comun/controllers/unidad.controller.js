const { UnidadService } = require('../services');

class UnidadController {
  async findAll(req, res, next) {
    try {
      const service = new UnidadService();
      const unidades = await service.findAll({ lng: req.t });
      res.status(200).json(unidades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodUnidad(req, res, next) {
    try {
      const { id } = req.params;
      const service = new UnidadService({ lng: req.t });
      const unidad = await service.findByCodUnidad({ cod: id });
      res.status(200).json(unidad);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = UnidadController;
