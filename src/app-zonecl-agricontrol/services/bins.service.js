const { BinsRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class BinsService {
  constructor({ codProductor, lng }) {
    this._repository = new BinsRepository({ codProductor: codProductor, lng: lng });
    this.lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodBins({ cod }) {
    const bin = await this._repository.findByCodBins({ cod: cod });

    if (bin.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return bin[0];
  }

  async create({ bin }) {
    return await this._repository.create(bin);
  }

  async update({ bin, cod }) {
    return await this._repository.update({
      cod: cod,
      data: bin,
    });
  }

  async delete({ cod }) {
    return await this._repository.update({
      codBins: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = BinsService;
