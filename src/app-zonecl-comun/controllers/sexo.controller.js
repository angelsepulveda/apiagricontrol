const { SexoService } = require('../services');

class SexoController {
  async findAll(req, res, next) {
    try {
      const service = new SexoService({ lng: req.t });
      const sexo = await service.findAll();
      res.status(200).json(sexo);
    } catch (e) {
      next(e);
    }
  }

  async findByCodSexo(req, res, next) {
    try {
      const { id } = req.params;
      const service = new SexoService({ lng: req.t });
      const sexo = await service.findByCodSexo({ cod: id });
      res.status(200).json(sexo);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = SexoController;
