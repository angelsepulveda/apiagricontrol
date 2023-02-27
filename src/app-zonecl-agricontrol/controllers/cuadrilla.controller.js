const { CuadrillaService } = require('../services');

class CuadrillaController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CuadrillaService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const cuadrillas = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(cuadrillas);
      } else {
        const cuadrillas = await service.findAll();
        res.status(200).json(cuadrillas);
      }
    } catch (e) {
      next(e);
    }
  }

  async findByCodCuadrilla(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CuadrillaService({ codProductor: codProductor, lng: req.t });
      const cuadrilla = await service.findByCodCuadrilla({ cod: id });
      res.status(200).json(cuadrilla);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new CuadrillaService({ codProductor: codProductor, lng: req.t });
      const cuadrilla = await service.create({ cuadrilla: body });
      return res.status(201).send(cuadrilla);
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
      const service = new CuadrillaService({ codProductor: codProductor, lng: req.t });
      const cuadrilla = await service.update({ cuadrilla: body, cod: id });
      return res.status(200).send(cuadrilla);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    const server = database.instanceDataBase(codProductor);
    try {
      const { id } = req.params;
      await server.connect();
      const service = new CuadrillaService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      await server.disconnect();
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      await server.disconnect();
      next(e);
    }
  }
}

module.exports = CuadrillaController;
