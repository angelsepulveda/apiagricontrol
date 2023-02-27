const { ProduccionService } = require('../services');

class ProduccionController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new ProduccionService({ codProductor: user.codProductor.toString() });
      const producciones = await service.findAll();
      res.status(200).json(producciones); 
    } catch (e) {
      next(e);
    }
  }

  async findByCodProduccion(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ProduccionService({ codProductor: user.codProductor.toString() });
      const produccion = await service.findByCodProduccion({ cod: id });
      res.status(200).json(produccion);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new ProduccionService({ codProductor: user.codProductor.toString() });
      const produccion = await service.create({ producto: body });
      return res.status(201).send(produccion);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const user = req.user;
      const service = new ProduccionService({ codProductor: user.codProductor.toString() });
      const produccion = await service.update({ producto: body, cod: id });
      return res.status(200).send(produccion);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const service = new ProduccionService({ codProductor: user.codProductor.toString() });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: 'El registro se elimino correctamente',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProduccionController;