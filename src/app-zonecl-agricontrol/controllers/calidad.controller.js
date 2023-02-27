const { CalidadService } = require('../services');

class CalidadController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const calidades = await service.findAll();
      res.status(200).json(calidades);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    try {
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const calidades = await service.findSelect();
      res.status(200).json(calidades);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCalidad(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const calidad = await service.findByCodCalidad({ cod: id });
      res.status(200).json(calidad);
    } catch (e) {
      next(e);
    }
  }
  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const calidad = await service.create({ calidad: body });
      return res.status(201).send(calidad);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      const calidad = await service.update({ calidad: body, cod: id });
      return res.status(200).send(calidad);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new CalidadService({ codProductor: user.codProductor.toString(), lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CalidadController;
