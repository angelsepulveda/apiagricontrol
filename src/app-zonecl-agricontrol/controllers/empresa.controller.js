const { EmpresaService } = require('../services');

class EmpresaController {
  async findAll(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const service = new EmpresaService({ codProductor: codProductor, lng: req.t });
      const empresas = await service.findAll();
      res.status(200).json(empresas);
    } catch (e) {
      next(e);
    }
  }

  async findByCodEmpresa(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EmpresaService({ codProductor: codProductor, lng: req.t });
      const empresa = await service.findByCodEmpresa({ cod: id });
      res.status(200).json(empresa);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { body } = req;
      const service = new EmpresaService({ codProductor: codProductor, lng: req.t });
      const empresa = await service.create({ empresa: body });
      return res.status(201).send(empresa);
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
      const service = new EmpresaService({ codProductor: codProductor, lng: req.t });
      const empresa = await service.update({ empresa: body, cod: id });
      return res.status(200).send(empresa);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const { id } = req.params;
      const service = new EmpresaService({ codProductor: codProductor, lng: req.t });
      await service.delete({ cod: id });
      return res.status(200).send({
        message: req.t('delete'),
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = EmpresaController;
