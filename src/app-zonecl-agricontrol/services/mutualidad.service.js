const { MutualidadRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class MutualidadService {
  constructor({ codProductor }) {
    this._repository = new MutualidadRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodMutualidad({ cod }) {
    const mutualidad = await this._repository.findByCodMutualidad({ cod: cod });

    if (mutualidad === null) throw new NotFoundException('Mutualidad no existe');

    return mutualidad;
  }
}
module.exports = MutualidadService;
