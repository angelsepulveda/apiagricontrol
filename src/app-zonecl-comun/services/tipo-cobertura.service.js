const { TipoCoberturaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TipoCoberturaService {
  constructor({ lng }) {
    this._repository = new TipoCoberturaRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTCobertura({ cod }) {
    const cobertura = await this._repository.findByCodTCobertura({ cod: cod });

    if (cobertura === null) throw new NotFoundException(this._lng('notFound'));

    return cobertura;
  }
}
module.exports = TipoCoberturaService;
