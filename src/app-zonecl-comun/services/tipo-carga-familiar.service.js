const { TipoCargaFamiliarRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TipoCargaFamiliarService {
  constructor({ lng }) {
    this._repository = new TipoCargaFamiliarRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTCargaFamiliar({ cod }) {
    const carga = await this._repository.findByCodTCargaFamiliar({ cod: cod });

    if (carga === null) throw new NotFoundException(this._lng('notFound'));

    return carga;
  }
}
module.exports = TipoCargaFamiliarService;
