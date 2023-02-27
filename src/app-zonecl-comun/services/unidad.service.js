const { UnidadRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class UnidadService {
  constructor({ lng }) {
    this._repository = new UnidadRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodUnidad({ cod }) {
    const unidad = await this._repository.findByCodUnidad({ cod: cod });

    if (unidad === null) throw new NotFoundException(this._lng('notFound'));

    return unidad;
  }
}
module.exports = UnidadService;
