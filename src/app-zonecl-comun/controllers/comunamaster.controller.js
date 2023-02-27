const { ComunaMasterService } = require('../services');

class ComunaMasterController {
  async findAll(req, res, next) {
    try {
      const service = new ComunaMasterService({ lng: req.t });
      const comunas = await service.findAll();
      res.status(200).json(comunas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodRegion(req, res, next) {
    try {
      const { id } = req.params;
      const service = new ComunaMasterService({ lng: req.t });
      const region = await service.findByCodRegion({ cod: id });
      res.status(200).json(region);
    } catch (e) {
      next(e);
    }
  }

  async findByCodComuna(req, res, next) {
    try {
      const { id } = req.params;
      const service = new ComunaMasterService({ lng: req.t });
      const comuna = await service.findByCodComuna({ cod: id });
      res.status(200).json(comuna);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = ComunaMasterController;
