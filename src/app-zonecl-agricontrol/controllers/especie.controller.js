const { EspecieService } = require('../services');

class EspecieController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new EspecieService({ codProductor: codProductor, lng: req.t });
      const especies = await service.findAll();
      res.status(200).json(especies);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new EspecieService({ codProductor: codProductor, lng: req.t });
      const especies = await service.findSelect();
      res.status(200).json(especies);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEspecie(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EspecieService({ codProductor: codProductor, lng: req.t });
      const especie = await service.findByCodEspecie({ cod: id });
      res.status(200).json(especie);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new EspecieService({ codProductor: codProductor, lng: req.t });
      const especie = await service.create({ codEspecieMaster: body.codEspecie });
      return res.status(201).send(especie);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EspecieService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = EspecieController;
