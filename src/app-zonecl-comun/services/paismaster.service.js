const { PaisMasterRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class PaisMasterService {
  constructor({ lng }) {
    this._repository = new PaisMasterRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodPais({ cod }) {
    const paisMaster = await this._repository.findByCodPais({ cod: cod });

    if (paisMaster === null) throw new NotFoundException(this._lng('notFound'));

    return paisMaster;
  }
}
module.exports = PaisMasterService;
