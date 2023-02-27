const { CuartelService } = require('../services');
class CuartelController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new CuartelService({ codProductor: codProductor, lng: req.t });
      if (user.role !== 0) {
        const cuarteles = await service.findAllCodCampo({ campos: user.campos });
        res.status(200).json(cuarteles);
      } else {
        const cuarteles = await service.findAll();
        res.status(200).json(cuarteles);
      }
    } catch (e) {
      next(e);
    }
  }

  async findByCodCuartel(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();

    try {
      const { id } = req.params;
      const service = new CuartelService({ codProductor: codProductor, lng: req.t });
      const cuartel = await service.findByCodCuartel({ codCuartel: id });
      res.status(200).json(cuartel);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new CuartelService({ codProductor: codProductor, lng: req.t });
      const cuartel = await service.create({ cuartel: body });
      return res.status(201).send(cuartel);
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
      const service = new CuartelService({ codProductor: codProductor, lng: req.t });
      const cuartel = await service.update({ cuartel: body, codCuartel: id });
      return res.status(200).send(cuartel);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new CuartelService({ codProductor: codProductor, lng: req.t });
      await service.delete({ codCuartel: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CuartelController;
