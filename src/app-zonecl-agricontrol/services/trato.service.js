const { TratoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TratoService {
  constructor({ codProductor, lng }) {
    this._repository = new TratoRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTrato({ cod }) {
    const trato = await this._repository.findByCodTrato({ cod: cod });

    if (trato.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return trato[0];
  }

  async create({ trato }) {
    return await this._repository.create(trato);
  }

  async update({ trato, cod }) {
    return await this._repository.update({
      cod: cod,
      data: trato,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = TratoService;
