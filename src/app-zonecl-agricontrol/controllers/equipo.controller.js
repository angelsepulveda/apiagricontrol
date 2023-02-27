const { EquipoService } = require('../services');

class EquipoController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipos = await service.findAll();
      res.status(200).json(equipos);
    } catch (e) {
      next(e);
    }
  }

  async findSelect(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();

    try {
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipos = await service.findSelect();
      res.status(200).json(equipos);
    } catch (e) {
      next(e);
    }
  }

  async findEquiposActivos(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipos = await service.findEquiposActivos();
      res.status(200).json(equipos);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEquipo(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipo = await service.findByCodEquipo({ cod: id });
      res.status(200).json(equipo);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEquipoJefe(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipo = await service.findByCodEquipoJefe({ cod: id });
      res.status(200).json(equipo);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipo = await service.create({ equipo: body });
      return res.status(201).send(equipo);
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
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      const equipo = await service.update({ equipo: body, cod: id });

      return res.status(200).send(equipo);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EquipoService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('notFound'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = EquipoController;
