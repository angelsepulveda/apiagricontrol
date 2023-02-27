const { ProduccionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class ProduccionService {
  constructor({ codProductor }) {
    this._repository = new ProduccionRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodProduccion({ cod }) {
    const produccion = await this._repository.findByCodProduccion({ cod: cod });

    if (produccion.length <= 0) throw new NotFoundException('la produccion no existe');

    return produccion[0];
  }

  async create({ producto }) {
    return await this._repository.create(producto);
  }

  async update({ producto, cod }) {
    return await this._repository.update({
      cod: cod,
      data: producto,
    });
  }

  async delete({ cod }) {
    return await this._repository.update({
      codProduccion: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = ProduccionService;
