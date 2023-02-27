const { ComunaService } = require('../services');

class ComunaController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new ComunaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const comunas = await service.findAll();
      res.status(200).json(comunas);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    try {
      const user = req.user;
      const service = new ComunaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const comunas = await service.findSelect();
      res.status(200).json(comunas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodComuna(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ComunaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const comuna = await service.findByCodComuna({ cod: id });
      res.status(200).json(comuna);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new ComunaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const comuna = await service.create({ codComunaMaster: body.codComuna });
      return res.status(201).send(comuna);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ComunaService({ codProductor: user.codProductor.toString(), lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ComunaController;
