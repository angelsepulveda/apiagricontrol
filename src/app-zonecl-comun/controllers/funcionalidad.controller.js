const { FuncionalidadService } = require('../services');

class FuncionalidadController {
  async findAll(req, res, next) {
    try {
      const service = new FuncionalidadService({ lng: req.t });
      const funcionalidad = await service.findAll();
      res.status(200).json(funcionalidad);
    } catch (e) {
      next(e);
    }
  }

  async findByCodFuncionalidad(req, res, next) {
    try {
      const { id } = req.params;
      const service = new FuncionalidadService({ lng: req.t });
      const funcionalidad = await service.findByCodFuncionalidad({ cod: id });
      res.status(200).json(funcionalidad);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = FuncionalidadController;
