const { EspecieMasterService } = require('../services');

class EspecieMasterController {
  async findAll(req, res, next) {
    try {
      const service = new EspecieMasterService({ lng: req.t });
      const especies = await service.findAll();
      res.status(200).json(especies);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEspecie(req, res, next) {
    try {
      const { id } = req.params;
      const service = new EspecieMasterService({ lng: req.t });
      const especie = await service.findByCodEspecie({ cod: id });
      res.status(200).json(especie);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = EspecieMasterController;
