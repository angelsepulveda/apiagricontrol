const { CuartelVariedadService } = require('../services');

class CuartelVariedadController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CuartelVariedadService({ codProductor: codProductor });
      const variedades = await service.findAll();
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCuartel(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CuartelVariedadService({ codProductor: codProductor });
      const variedad = await service.findByCodCuartel({
        codCuartel: id,
      });
      res.status(200).json(variedad);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCuartelSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CuartelVariedadService({ codProductor: codProductor });
      const variedades = await service.findByCodCuartelSelect({
        codCuartel: id,
      });
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CuartelVariedadController;
