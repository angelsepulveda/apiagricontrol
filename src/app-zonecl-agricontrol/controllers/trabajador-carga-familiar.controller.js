const { TrabajadorCargaFamiliarService } = require('../services');

class TrabajadorCargaFamiliarController {
  async findAll (req, res, next) {
    try {
      const user = req.user;
      const service = new TrabajadorCargaFamiliarService({ codProductor: user.codProductor.toString() });
      const trabajadoresCargaFamiliar = await service.findAll();
      res.status(200).json(trabajadoresCargaFamiliar);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTrabajadorCargaFamiliar (req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new TrabajadorCargaFamiliarService({ codProductor: user.codProductor.toString() });
      const trabajadorCargaFamiliar = await service.findByCodTrabajadorCargaFamiliar({ cod: id });
      res.status(200).json(trabajadorCargaFamiliar);
    } catch (e) {
      next(e);
    }
  }

  async create (req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new TrabajadorCargaFamiliarService({ codProductor: user.codProductor.toString() });
      const trabajadorCargaFamiliar = await service.create({ trabajadorCargaFamiliar: body });
      return res.status(201).send(trabajadorCargaFamiliar);
    } catch (e) {
      next(e);
    }
  }

  async update (req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new TrabajadorCargaFamiliarService({ codProductor: user.codProductor.toString() });
      const trabajadorCargaFamiliar = await service.update({ trabajadorCargaFamiliar: body, cod: id });
      return res.status(200).send(trabajadorCargaFamiliar);
    } catch (e) {
      next(e);
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new TrabajadorCargaFamiliarService({ codProductor: user.codProductor.toString() });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: 'El registro se elimino correctamente',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TrabajadorCargaFamiliarController;
