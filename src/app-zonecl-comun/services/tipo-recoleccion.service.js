const { TipoRecoleccionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TipoRecoleccionService {
  constructor({ lng }) {
    this._repository = new TipoRecoleccionRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTipoRecoleccion({ cod }) {
    const tipo = await this._repository.findByCodTipoRecoleccion({ cod: cod });

    if (tipo === null) throw new NotFoundException(this._lng('notFound'));

    return tipo;
  }
}

module.exports = TipoRecoleccionService;
