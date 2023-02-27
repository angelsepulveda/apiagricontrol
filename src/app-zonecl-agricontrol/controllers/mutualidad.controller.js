const { MutualidadService } = require('../services');

class MutualidadController {
  async findAll(req, res, next) {
    const user = req.user;
    try {
      const service = new MutualidadService({ codProductor: user.codProductor.toString() });
      const mutualidad = await service.findAll();
      res.status(200).json(mutualidad);
    } catch (e) {
      next(e);
    }
  }

  async findByCodMutualidad(req, res, next) {
    const user = req.user;
    try {
      const { id } = req.params;
      const service = new MutualidadService({ codProductor: user.codProductor.toString() });
      const mutualidad = await service.findByCodMutualidad({ cod: id });
      res.status(200).json(mutualidad);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = MutualidadController;
