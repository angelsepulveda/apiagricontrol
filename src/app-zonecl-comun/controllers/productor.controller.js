const { ProductorService } = require('../services');

class ProductorController {
  async findAll(req, res, next) {
    try {
      const service = new ProductorService({ lng: req.t });
      const productor = await service.findAll();
      res.status(200).json(productor);
    } catch (e) {
      next(e);
    }
  }

  async findByCodProductor(req, res, next) {
    try {
      const { id } = req.params;
      const service = new ProductorService({ lng: req.t });
      const productor = await service.findByCodProductor({ cod: id });
      res.status(200).json(productor);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = ProductorController;
