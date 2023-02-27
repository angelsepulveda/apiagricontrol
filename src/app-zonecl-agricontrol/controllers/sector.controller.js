const { SectorService } = require('../services');

class SectorController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const sectores = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(sectores);
      } else {
        const sectores = await service.findAll();
        res.status(200).json(sectores);
      }
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const sectores = await service.findAllCodCampo({ campos: user.campos });

        res.status(200).json(sectores);
      } else {
        const sectores = await service.findSelect();

        res.status(200).json(sectores);
      }
    } catch (e) {
      next(e);
    }
  }

  async findByCodSector(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      const sector = await service.findByCodSector({ cod: id });
      res.status(200).json(sector);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCampo(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      const sector = await service.findByCodCampo({ cod: id });
      res.status(200).json(sector);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      const sector = await service.create({ sector: body });
      return res.status(201).send(sector);
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
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      const sector = await service.update({ sector: body, cod: id });
      return res.status(200).send(sector);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new SectorService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SectorController;
