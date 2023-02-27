const { BancoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class BancoService {
  constructor({ lng }) {
    this._repository = new BancoRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodBanco({ cod }) {
    const banco = await this._repository.findByCodBanco({ cod: cod });

    if (banco === null) throw new NotFoundException(this._lng('notFound'));

    return banco;
  }
}

module.exports = BancoService;
