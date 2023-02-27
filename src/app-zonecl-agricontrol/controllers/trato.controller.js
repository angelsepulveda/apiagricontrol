const { TratoService } = require('../services');

class TratoController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new TratoService({ codProductor: codProductor, lng: req.t });
      const tratos = await service.findAll();
      res.status(200).json(tratos);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTrato(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TratoService({ codProductor: codProductor, lng: req.t });
      const trato = await service.findByCodTrato({ cod: id });
      res.status(200).json(trato);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new TratoService({ codProductor: codProductor, lng: req.t });
      const trato = await service.create({ trato: body });
      return res.status(201).send(trato);
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
      const service = new TratoService({ codProductor: codProductor, lng: req.t });
      const trato = await service.update({ trato: body, cod: id });
      return res.status(200).send(trato);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TratoService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TratoController;
