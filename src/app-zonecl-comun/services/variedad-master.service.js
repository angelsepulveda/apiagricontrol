const { VariedadMasterRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class VariedadMasterService {
  constructor({ lng }) {
    this._repository = new VariedadMasterRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodVariedad({ cod }) {
    const variedad = await this._repository.findByCodVariedad({ cod: cod });

    if (variedad.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return variedad[0];
  }

  async findByCodEspecie({ cod }) {
    return await this._repository.findByCodEspecie({ cod: cod });
  }
}
module.exports = VariedadMasterService;
