const { RegionService } = require('../services');

class RegionController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new RegionService({ codProductor: codProductor, lng: req.t });
      const regiones = await service.findAll();
      res.status(200).json(regiones);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new RegionService({ codProductor: codProductor, lng: req.t });
      const regiones = await service.findSelect();
      res.status(200).json(regiones);
    } catch (e) {
      next(e);
    }
  }

  async findByCodRegion(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new RegionService({ codProductor: codProductor.toString(), lng: req.t });
      const region = await service.findByCodRegion({ cod: id });
      res.status(200).json(region);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new RegionService({ codProductor: codProductor, lng: req.t });
      const region = await service.create({ codRegionMaster: body.codRegion });
      return res.status(201).send(region);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new RegionService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = RegionController;
