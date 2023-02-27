const { DireccionRepository } = require('../repositories');

class DireccionService {
  constructor({ codProductor, lng }) {
    this._repository = new DireccionRepository({ codProductor: codProductor, lng: lng });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodDireccion({ cod }) {
    return await this._repository.findByCodDireccion({ cod: cod });
  }

  async create({ direccion }) {
    return await this._repository.create(direccion);
  }

  async update({ direccion, cod }) {
    return await this._repository.update({
      codDireccion: cod,
      data: direccion,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codDireccion: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = DireccionService;
