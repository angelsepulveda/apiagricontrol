const { DireccionService } = require('../services');

class DireccionController {
  async findAll(req, res, next) {
    const user = req.user;
    try {
      const service = new DireccionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const direccion = await service.findAll();
      res.status(200).json(direccion);
    } catch (e) {
      next(e);
    }
  }

  async findByCodDireccion(req, res, next) {
    const user = req.user;
    try {
      const { id } = req.params;
      const service = new DireccionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const direccion = await service.findByCodDireccion({ cod: id });
      res.status(200).json(direccion);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = DireccionController;
