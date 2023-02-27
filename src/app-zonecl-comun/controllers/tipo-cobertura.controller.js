const { TipoCoberturaService } = require('../services');

class TipoCoberturaController {
  async findAll(req, res, next) {
    try {
      const service = new TipoCoberturaService({ lng: req.t });
      const cobertura = await service.findAll();
      res.status(200).json(cobertura);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTCobertura(req, res, next) {
    try {
      const { id } = req.params;
      const service = new TipoCoberturaService({ lng: req.t });
      const cobertura = await service.findByCodTCobertura({ cod: id });
      res.status(200).json(cobertura);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = TipoCoberturaController;
