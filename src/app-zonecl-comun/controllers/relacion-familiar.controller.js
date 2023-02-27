const { RelacionFamiliarService } = require('../services');

class RelacionFamiliarController {
  async findAll(req, res, next) {
    try {
      const service = new RelacionFamiliarService({ lng: req.t });
      const relacion = await service.findAll();
      res.status(200).json(relacion);
    } catch (e) {
      next(e);
    }
  }

  async findByCodRelacionFamiliar(req, res, next) {
    try {
      const { id } = req.params;
      const service = new RelacionFamiliarService({ lng: req.t });
      const relacion = await service.findByCodRelacionFamiliar({ cod: id });
      res.status(200).json(relacion);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = RelacionFamiliarController;
