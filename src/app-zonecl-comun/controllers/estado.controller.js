const { EstadoService } = require('../services');

class EstadoController {
  async findAll(req, res, next) {
    try {
      const service = new EstadoService({ lng: req.t });
      const estados = await service.findAll();
      res.status(200).json(estados);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEstado(req, res, next) {
    try {
      const { id } = req.params;
      const service = new EstadoService({ lng: req.t });
      const estado = await service.findByCodEstado({ cod: id });
      res.status(200).json(estado);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = EstadoController;
