const { VariedadService } = require('../services');

class VariedadController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      const variedades = await service.findAll();
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      const variedades = await service.findSelect();
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodVariedad(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      const variedad = await service.findByCodVariedad({ cod: id });
      res.status(200).json(variedad);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEspecie(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      const variedades = await service.findByCodEspecie({ cod: id });
      res.status(200).json(variedades);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      const localidad = await service.create({ codVariedadMaster: body.codVariedad });
      return res.status(201).send(localidad);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new VariedadService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = VariedadController;
