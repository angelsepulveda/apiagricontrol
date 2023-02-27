const { TipoCargaFamiliarService } = require('../services');

class TipoCargaFamiliarController {
  async findAll(req, res, next) {
    try {
      const service = new TipoCargaFamiliarService({ lng: req.t });
      const carga = await service.findAll();
      res.status(200).json(carga);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTCargaFamiliar(req, res, next) {
    try {
      const { id } = req.params;
      const service = new TipoCargaFamiliarService({ lng: req.t });
      const carga = await service.findByCodTCargaFamiliar({ cod: id });
      res.status(200).json(carga);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = TipoCargaFamiliarController;
