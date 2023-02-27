const { UnidadMedidaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class UnidadMedidaService {
  constructor({ lng }) {
    this._repository = new UnidadMedidaRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodUnidadMedida({ cod }) {
    const unidad = await this._repository.findByCodUnidadMedida({ cod: cod });

    if (unidad === null) throw new NotFoundException(this._lng('notFound'));

    return unidad;
  }
}

module.exports = UnidadMedidaService;
