const { MonedaService } = require('../services');

class MonedaController {
  async findAll (req, res, next) {
    try {
      const service = new MonedaService({ codProductor: '1' });
      const monedas = await service.findAll();
      res.status(200).json(monedas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodMoneda (req, res, next) {
    try {
      const { id } = req.params;
      const service = new MonedaService({ codProductor: '1' });
      const moneda = await service.findByCodMoneda({ cod: id });
      res.status(200).json(moneda);
    } catch (e) {
      next(e);
    }
  }

  async create (req, res, next) {
    try {
      const { body } = req;
      const service = new MonedaService({ codProductor: '1' });
      const moneda = await service.create({ moneda: body });
      return res.status(201).send(moneda);
    } catch (e) {
      next(e);
    }
  }

  async update (req, res, next) {
    try {
      const { body } = req;
      const { id } = req.params;
      const service = new MonedaService({ codProductor: '1' });
      const moneda = await service.update({ moneda: body, cod: id });
      return res.status(200).send(moneda);
    } catch (e) {
      next(e);
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params;
      const service = new MonedaService({ codProductor: '1' });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: 'El registro se elimino correctamente',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = MonedaController;
