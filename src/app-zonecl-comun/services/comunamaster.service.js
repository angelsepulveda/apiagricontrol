const { ComunaMasterRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class ComunaMasterService {
  constructor({ lng }) {
    this._repository = new ComunaMasterRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodRegion({ cod }) {
    return await this._repository.findByCodRegion({ cod: cod });
  }

  async findByCodComuna({ cod }) {
    const comuna = await this._repository.findByCodComuna({ cod: cod });

    if (comuna.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return comuna[0];
  }
}
module.exports = ComunaMasterService;
