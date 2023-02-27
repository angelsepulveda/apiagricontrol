const { FuncionalidadRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class FuncionalidadService {
  constructor({ lng }) {
    this._repository = new FuncionalidadRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodFuncionalidad({ cod }) {
    const funcionalidad = await this._repository.findByCodFuncionalidad({ cod: cod });

    if (funcionalidad === null) throw new NotFoundException(this._lng('notFound'));

    return funcionalidad;
  }
}
module.exports = FuncionalidadService;
