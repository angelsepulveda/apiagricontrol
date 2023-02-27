const { SexoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class SexoService {
  constructor({ lng }) {
    this._repository = new SexoRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodSexo({ cod }) {
    const sexo = await this._repository.findByCodSexo({ cod: cod });

    if (sexo === null) throw new NotFoundException(this._lng('notFound'));

    return sexo;
  }
}
module.exports = SexoService;
