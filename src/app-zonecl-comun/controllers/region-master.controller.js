const { RegionMasterService } = require('../services');

class RegionMasterController {
  async findAll(req, res, next) {
    try {
      const service = new RegionMasterService({ lng: req.t });
      const regiones = await service.findAll();
      res.status(200).json(regiones);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    try {
      const service = new RegionMasterService({ lng: req.t });
      const regiones = await service.findSelect();
      res.status(200).json(regiones);
    } catch (e) {
      next(e);
    }
  }

  async findByCodPais(req, res, next) {
    try {
      const { id } = req.params;
      const service = new RegionMasterService({ lng: req.t });
      const regiones = await service.findByCodPais({ cod: id });
      res.status(200).json(regiones);
    } catch (e) {
      next(e);
    }
  }
  async findByCodRegion(req, res, next) {
    try {
      const { id } = req.params;
      const service = new RegionMasterService({ lng: req.t });
      const region = await service.findByCodRegion({ cod: id });
      res.status(200).json(region);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = RegionMasterController;
