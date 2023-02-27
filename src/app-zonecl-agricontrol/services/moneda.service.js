const { MonedaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class MonedaService {
  constructor({ codProductor }) {
    this._repository = new MonedaRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodMoneda({ cod }) {
    const moneda = await this._repository.findByCodMoneda({ cod: cod });

    if (moneda === null) throw new NotFoundException('La moneda no existe');

    return moneda;
  }

  async create({ moneda }) {
    return await this._repository.create(moneda);
  }

  async update({ moneda, cod }) {
    return await this._repository.update({
      codMoneda: cod,
      data: moneda,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codMoneda: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = MonedaService;
