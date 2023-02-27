const { TemporadaService } = require('../services');

class TemporadaController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new TemporadaService({ codProductor: codProductor, lng: req.t });
      const temporadas = await service.findAll();
      res.status(200).json(temporadas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTemporada(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TemporadaService({ codProductor: codProductor, lng: req.t });
      const temporada = await service.findByCodTemporada({ cod: id });
      res.status(200).json(temporada);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new TemporadaService({ codProductor: codProductor, lng: req.t });
      const temporada = await service.create({ temporada: body });
      return res.status(201).send(temporada);
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
      const service = new TemporadaService({ codProductor: codProductor, lng: req.t });
      const temporada = await service.update({ temporada: body, cod: id });
      return res.status(200).send(temporada);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TemporadaService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TemporadaController;
