const { EstadoCivilRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class EstadoCivilService {
  constructor({ lng }) {
    this._repository = new EstadoCivilRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodEstadoCivil({ cod }) {
    const estadoCivil = await this._repository.findByCodEstadoCivil({ cod: cod });

    if (estadoCivil === null) throw new NotFoundException(this._lng('notFound'));

    return estadoCivil;
  }
}
module.exports = EstadoCivilService;
