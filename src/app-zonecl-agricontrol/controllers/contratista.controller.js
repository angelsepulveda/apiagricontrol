const { ContratistaService } = require('../services');

class ContratistaController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const contratistas = await service.findAll();
      res.status(200).json(contratistas);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    try {
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const contratistas = await service.findSelect();
      res.status(200).json(contratistas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodContratista(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const contratista = await service.findByCodContratista({ cod: id });
      res.status(200).json(contratista);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const contratista = await service.create({ contratista: body });
      return res.status(201).send(contratista);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const contratista = await service.update({ contratista: body, cod: id });
      return res.status(200).send(contratista);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ContratistaService({ codProductor: user.codProductor.toString(), lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ContratistaController;
