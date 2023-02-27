const { VariedadMasterService } = require('../services');

class VariedadMasterController {
  async findAll(req, res, next) {
    try {
      const service = new VariedadMasterService({ lng: req.t });
      const variedades = await service.findAll();
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodVariedad(req, res, next) {
    try {
      const { id } = req.params;
      const service = new VariedadMasterService({ lng: req.t });
      const variedad = await service.findByCodVariedad({ cod: id });
      res.status(200).json(variedad);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEspecie(req, res, next) {
    try {
      const { id } = req.params;
      const service = new VariedadMasterService({ lng: req.t });
      const variedad = await service.findByCodEspecie({ cod: id });
      res.status(200).json(variedad);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = VariedadMasterController;
