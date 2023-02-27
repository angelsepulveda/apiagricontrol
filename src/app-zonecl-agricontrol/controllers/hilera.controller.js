const { HileraService } = require('../services');

class HileraController {
  async findAll(req, res, next) {
    try {
      const user = req.user;
      const service = new HileraService({ codProductor: user.codProductor.toString() });
      const hileras = await service.findAll();
      res.status(200).json(hileras);
    } catch (e) {
      next(e);
    }
  }

  /**
   * GET
   * localhost:3000/api/hileras/find?codHilera=1&codCampo=1&codCuartel=1&codSector=1&codVariedad=1
   */
  async findByCodHileraCampoSectorCuartelVariedad(req, res, next) {
    try {
      const codHilera = req.query.codHilera;
      const codCampo = req.query.codCampo;
      const codCuartel = req.query.codCuartel;
      const codSector = req.query.codSector;
      const codVariedad = req.query.codVariedad;
      const user = req.user;
      const service = new HileraService({ codProductor: user.codProductor.toString() });
      const hilera = await service.findByCodHileraCampoSectorCuartelVariedad({
        codHilera: codHilera,
        codCampo: codCampo,
        codCuartel: codCuartel,
        codSector: codSector,
        codVariedad: codVariedad,
      });
      res.status(200).json(hilera);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const user = req.user;
      const service = new HileraService({ codProductor: user.codProductor.toString() });
      const hilera = await service.create({ hilera: body });
      return res.status(201).send(hilera);
    } catch (e) {
      next(e);
    }
  }
  /**
   * PUT
   * localhost:3000/api/hileras?codHilera=1&codCampo=1&codCuartel=1&codSector=1&codVariedad=1
   */
  async update(req, res, next) {
    try {
      const { body } = req;
      const codHilera = req.query.codHilera;
      const codCampo = req.query.codCampo;
      const codCuartel = req.query.codCuartel;
      const codSector = req.query.codSector;
      const codVariedad = req.query.codVariedad;
      const user = req.user;
      const service = new HileraService({ codProductor: user.codProductor.toString() });
      const hilera = await service.update({
        hilera: body,
        codHilera: codHilera,
        codCampo: codCampo,
        codCuartel: codCuartel,
        codSector: codSector,
        codVariedad: codVariedad,
      });
      return res.status(200).send(hilera);
    } catch (e) {
      next(e);
    }
  }

  /**
   * DELETE
   *  localhost:3000/api/hileras?codHilera=1&codCampo=1&codCuartel=1&codSector=1&codVariedad=1
   */
  async delete(req, res, next) {
    try {
      const codHilera = req.query.codHilera;
      const codCampo = req.query.codCampo;
      const codCuartel = req.query.codCuartel;
      const codSector = req.query.codSector;
      const codVariedad = req.query.codVariedad;
      const user = req.user;
      const service = new HileraService({ codProductor: user.codProductor.toString() });
      await service.delete({
        codCampo: codCampo,
        codCuartel: codCuartel,
        codSector: codSector,
        codVariedad: codVariedad,
        codHilera: codHilera,
      });
      return res.status(200).send({
        message: 'El registro se elimino correctamente',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = HileraController;
