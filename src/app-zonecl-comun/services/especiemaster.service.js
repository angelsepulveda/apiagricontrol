const { EspecieMasterRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class EspecieMasterService {
  constructor({ lng }) {
    this._repository = new EspecieMasterRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodEspecie({ cod }) {
    const especie = await this._repository.findByCodEspecie({ cod: cod });

    if (especie === null) throw new NotFoundException(this._lng('notFound'));

    return especie;
  }
}
module.exports = EspecieMasterService;
