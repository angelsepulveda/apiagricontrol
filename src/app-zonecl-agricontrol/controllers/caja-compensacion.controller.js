const { CajaCompensacionService } = require('../services');

class CajaCompensacionController {
  async findAll(req, res, next) {
    const user = req.user;
    try {
      const service = new CajaCompensacionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const cajaCompensacion = await service.findAll();
      res.status(200).json(cajaCompensacion);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCajaCompensacion(req, res, next) {
    const user = req.user;
    try {
      const { id } = req.params;
      const service = new CajaCompensacionService({ codProductor: user.codProductor.toString(), lng: req.t });
      const cajaCompensacion = await service.findByCodCajaCompensacion({ cod: id });
      res.status(200).json(cajaCompensacion);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CajaCompensacionController;
