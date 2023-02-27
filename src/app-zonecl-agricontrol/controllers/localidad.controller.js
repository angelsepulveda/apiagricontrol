const { LocalidadService } = require('../services');

class LocalidadController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new LocalidadService({ codProductor: codProductor, lng: req.t });
      const localidades = await service.findAll();
      res.status(200).json(localidades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodLocalidad(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new LocalidadService({ codProductor: codProductor, lng: req.t });
      const localidad = await service.findByCodLocalidad({ cod: id });
      res.status(200).json(localidad);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new LocalidadService({ codProductor: codProductor, lng: req.t });
      const localidad = await service.create({ localidad: body });
      return res.status(201).send(localidad);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const { id } = req.params;
      const service = new LocalidadService({ codProductor: codProductor, lng: req.t });
      const localidad = await service.update({ localidad: body, cod: id });
      return res.status(200).send(localidad);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new LocalidadService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = LocalidadController;
