const { CampoService } = require('../services');

class CampoController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const campos = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(campos);
      } else {
        const campos = await service.findAll();
        res.status(200).json(campos);
      }
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const campos = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(campos);
      } else {
        const campos = await service.findSelect();
        res.status(200).json(campos);
      }
    } catch (e) {
      next(e);
    }
  }

  async findAllSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const campos = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(campos);
      } else {
        const campos = await service.findAll();
        res.status(200).json(campos);
      }
    } catch (e) {
      next(e);
    }
  }

  async findByCodCampo(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      const campo = await service.findByCodCampo({ cod: id });
      res.status(200).json(campo);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      const campo = await service.create({ campo: body });
      res.status(201).send(campo);
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
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      const campo = await service.update({ campo: body, cod: id });
      res.status(200).send(campo);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CampoService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CampoController;
