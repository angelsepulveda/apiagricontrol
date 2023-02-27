const { TableEntidadService } = require('../services');

class TablaEntidadController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new TableEntidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const tablaEntidades = await service.findAll();
      res.status(200).json(tablaEntidades);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TablaEntidadController;
