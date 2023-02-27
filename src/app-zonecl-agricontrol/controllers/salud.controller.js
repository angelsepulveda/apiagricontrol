const { SaludService } = require('../services');

class SaludController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new SaludService({ codProductor: user.codProductor.toString(), lng: req.t });
      const salud = await service.findAll();
      res.status(200).json(salud);
    } catch (e) {
      next(e);
    }
  }

  async findByCodSalud(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new SaludService({ codProductor: user.codProductor.toString(), lng: req.t });
      const salud = await service.findByCodSalud({ cod: id });
      res.status(200).json(salud);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SaludController;
