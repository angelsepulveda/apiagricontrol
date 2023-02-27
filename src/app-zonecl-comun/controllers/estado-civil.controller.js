const { EstadoCivilService } = require('../services');

class EstadoCivilController {
  async findAll(req, res, next) {
    try {
      const service = new EstadoCivilService({ lng: req.t });
      const estadocivil = await service.findAll();
      res.status(200).json(estadocivil);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEstadoCivil(req, res, next) {
    try {
      const { id } = req.params;
      const service = new EstadoCivilService({ lng: req.t });
      const estadoCivil = await service.findByCodEstadoCivil({ cod: id });
      res.status(200).json(estadoCivil);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = EstadoCivilController;
