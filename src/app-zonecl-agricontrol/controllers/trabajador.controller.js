const { TrabajadorService } = require('../services');

class TrabajadorController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajadores = await service.findAll();
      res.status(200).json(trabajadores);
    } catch (e) {
      next(e);
    }
  }

  async findByCodCuadrilla(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.findByCodCuadrilla({ codCuadrilla: id });
      res.status(200).json(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async findTrabajadoresActivos(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajadores = await service.findTrabajadoresActivos({ codTrabajador: id });
      res.status(200).json(trabajadores);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTrabajador(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.findByCodTrabajador({ cod: id });
      res.status(200).json(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async findByCodTrabajadorSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.findByCodTrabajadorSelect({ cod: id });
      res.status(200).json(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.create({ trabajador: body });
      return res.status(201).send(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async createMasivo(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      await service.createMasiva(body);
      return res.status(201).json({ message: 'Trabajador creado' });
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
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.update({ trabajador: body, cod: id });
      return res.status(200).send(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async updateMasivo(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      const trabajador = await service.updateMasivo({ trabajador: body, cod: id });
      return res.status(200).send(trabajador);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new TrabajadorService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = TrabajadorController;
