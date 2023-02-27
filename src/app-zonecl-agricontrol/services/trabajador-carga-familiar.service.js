const { TrabajadorCargaFamiliarRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TrabajadorCargaFamiliarService {
  constructor({ codProductor }) {
    this._repository = new TrabajadorCargaFamiliarRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTrabajadorCargaFamiliar({ cod }) {
    const trabajadorCargaFamiliar = await this._repository.findByCodTrabajadorGargaFamiliar({ cod: cod });

    if (trabajadorCargaFamiliar.length <= 0) throw new NotFoundException('La carga familiar del trabajador no existe');

    return trabajadorCargaFamiliar[0];
  }

  async create({ trabajadorCargaFamiliar }) {
    return await this._repository.create(trabajadorCargaFamiliar);
  }

  async update({ trabajadorCargaFamiliar, cod }) {
    return await this._repository.update({
      codTrabajadorCargaFamiliar: cod,
      data: trabajadorCargaFamiliar,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codTrabajadorCargaFamiliar: cod,
      data: {
        codEstado: 0,
      },
    });
  }
}

module.exports = TrabajadorCargaFamiliarService;
