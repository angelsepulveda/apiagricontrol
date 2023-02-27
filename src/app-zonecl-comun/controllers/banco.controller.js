const { BancoService } = require('../services');

class BancoController {
  async findAll(req, res, next) {
    try {
      const service = new BancoService({ lng: req.t });
      const bancos = await service.findAll();
      res.status(200).json(bancos);
    } catch (e) {
      next(e);
    }
  }

  async findByCodBanco(req, res, next) {
    try {
      const { id } = req.params;
      const service = new BancoService({ lng: req.t });
      const banco = await service.findByCodBanco({ cod: id });
      res.status(200).json(banco);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BancoController;
