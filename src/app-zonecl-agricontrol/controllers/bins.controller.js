const { BinsService } = require('../services');

class BinsController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new BinsService({ codProductor: user.codProductor.toString(), lng: req.t });
      const bins = await service.findAll();
      res.status(200).json(bins);
    } catch (e) {
      next(e);
    }
  }

  async findByCodBins(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new BinsService({ codProductor: user.codProductor.toString(), lng: req.t });
      const bin = await service.findByCodBins({ cod: id });
      res.status(200).json(bin);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new BinsService({ codProductor: user.codProductor.toString(), lng: req.t });
      const bin = await service.create({ bin: body });
      return res.status(201).send(bin);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new BinsService({ codProductor: user.codProductor.toString(), lng: req.t });
      const bin = await service.update({ bin: body, cod: id });
      return res.status(200).send(bin);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new BinsService({ codProductor: user.codProductor.toString(), lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BinsController;
