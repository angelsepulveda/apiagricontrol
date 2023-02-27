const { PaisMasterService } = require('../services');

class PaisMasterController {
  async findAll(req, res, next) {
    try {
      const service = new PaisMasterService({ lng: req.t });
      const paises = await service.findAll();
      res.status(200).json(paises);
    } catch (e) {
      next(e);
    }
  }

  async findByCodPais(req, res, next) {
    try {
      const { id } = req.params;
      const service = new PaisMasterService({ lng: req.t });
      const paisMaster = await service.findByCodPais({ cod: id });
      res.status(200).json(paisMaster);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = PaisMasterController;
