const { PrevisionService } = require('../services');

class PrevisionController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new PrevisionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const prevision = await service.findAll();
      res.status(200).json(prevision);
    } catch (e) {
      next(e);
    }
  }

  async findByCodPrevision(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new PrevisionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const prevision = await service.findByCodPrevision({ cod: id });
      res.status(200).json(prevision);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PrevisionController;
