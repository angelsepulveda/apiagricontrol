const { TipoEquipoService } = require('../services');

class TipoEquipoController {
  async findAll(req, res, next) {
    try {
      const service = new TipoEquipoService({ lng: req.t });
      const equipos = await service.findAll();
      res.status(200).json(equipos);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTEquipo(req, res, next) {
    try {
      const { id } = req.params;
      const service = new TipoEquipoService({ lng: req.t });
      const equipo = await service.findByCodTEquipo({ cod: id });
      res.status(200).json(equipo);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = TipoEquipoController;
