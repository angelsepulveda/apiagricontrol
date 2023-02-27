const { TipoRecoleccionService } = require('../services');

class TipoRecoleccionController {
  async findAll(req, res, next) {
    try {
      const service = new TipoRecoleccionService({ lng: req.t });
      const tipos = await service.findAll();
      res.status(200).json(tipos);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTipoRecoleccion(req, res, next) {
    try {
      const { id } = req.params;
      const service = new TipoRecoleccionService({ lng: req.t });
      const tipo = await service.findByCodTipoRecoleccion({ cod: id });
      res.status(200).json(tipo);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TipoRecoleccionController;
