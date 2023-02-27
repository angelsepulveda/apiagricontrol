const { PrevisionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class PrevisionService {
  constructor({ codProductor, lng }) {
    this._repository = new PrevisionRepository({ codProductor: codProductor });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodPrevision({ cod }) {
    const prevision = await this._repository.findByCodPrevision({ cod: cod });

    if (prevision === null) throw new NotFoundException(this._lng('notFound'));

    return prevision;
  }
}

module.exports = PrevisionService;
