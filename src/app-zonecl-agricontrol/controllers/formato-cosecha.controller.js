const { FormatoCosechaService } = require('../services');

class FormatoCosechaController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosechas = await service.findAll();
      res.status(200).json(formatoCosechas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodFormatoCosecha(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosecha = await service.findByCodFormatoCosecha({ cod: id });
      res.status(200).json(formatoCosecha);
    } catch (e) {
      next(e);
    }
  }

  async findByFormatoCosechaCampos(req, res, next) {
    try {
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosechas = await service.findByFormatoCosechaCampos();
      res.status(200).json(formatoCosechas);
    } catch (e) {
      next(e);
    }
  }

  async formatoCosechasCamposAll(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.params;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosechas = await service.formatoCosechasCamposAll({ codCampo: id });
      res.status(200).json(formatoCosechas);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosecha = await service.create({ formato: body });
      return res.status(201).send(formatoCosecha);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      const formatoCosecha = await service.update({ formato: body, cod: id });
      return res.status(200).send(formatoCosecha);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new FormatoCosechaService({ codProductor: user.codProductor.toString(), lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = FormatoCosechaController;
