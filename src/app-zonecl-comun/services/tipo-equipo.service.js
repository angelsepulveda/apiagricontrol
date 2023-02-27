const { TipoEquipoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TipoEquipoService {
  constructor({ lng }) {
    this._repository = new TipoEquipoRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTEquipo({ cod }) {
    const equipo = await this._repository.findByCodTEquipo({ cod: cod });

    if (equipo === null) throw new NotFoundException(this._lng('notFound'));

    return equipo;
  }
}
module.exports = TipoEquipoService;
