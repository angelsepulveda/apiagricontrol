const { PaisService } = require('../services');
class PaisController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new PaisService({ codProductor: codProductor, lng: req.t });
      const paises = await service.findAll();
      res.status(200).json(paises);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();

    try {
      const service = new PaisService({ codProductor: codProductor, lng: req.t });
      const paises = await service.findSelect();
      res.status(200).json(paises);
    } catch (e) {
      next(e);
    }
  }

  async findByCodPais(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new PaisService({ codProductor: codProductor, lng: req.t });
      const pais = await service.findByCodPais({ cod: id });
      res.status(200).json(pais);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new PaisService({ codProductor: codProductor, lng: req.t });
      const pais = await service.create({ codPaisMaster: body.codPais });
      return res.status(201).send(pais);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new PaisService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PaisController;
