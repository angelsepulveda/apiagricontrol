const { UnidadMedidaService } = require('../services');

class UnidadMedidaController {
  async findAll(req, res, next) {
    try {
      const service = new UnidadMedidaService({ lng: req.t });
      const unidades = await service.findAll();
      res.status(200).json(unidades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodUnidadMedida(req, res, next) {
    try {
      const { id } = req.params;
      const service = new UnidadMedidaService({ lng: req.t });
      const unidad = await service.findByCodUnidadMedida({ cod: id });
      res.status(200).json(unidad);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UnidadMedidaController;
