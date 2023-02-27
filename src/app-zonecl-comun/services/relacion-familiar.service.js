const { RelacionFamiliarRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class RelacionFamiliarService {
  constructor({ lng }) {
    this._repository = new RelacionFamiliarRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodRelacionFamiliar({ cod }) {
    const relacion = await this._repository.findByCodRelacionFamiliar({ cod: cod });

    if (relacion === null) throw new NotFoundException(this._lng('notFound'));

    return relacion;
  }
}
module.exports = RelacionFamiliarService;
