const { LocalidadRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class LocalidadService {
  constructor({ codProductor, lng }) {
    this._repository = new LocalidadRepository({ codProductor: codProductor, lng: lng });
    this.lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodLocalidad({ cod }) {
    const localidad = await this._repository.findByCodLocalidad({ cod: cod });

    if (localidad.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return localidad[0];
  }

  async create({ localidad }) {
    return await this._repository.create(localidad);
  }

  async update({ localidad, cod }) {
    return await this._repository.update({
      codLocalidad: cod,
      data: localidad,
    });
  }

  async delete({ cod }) {
    return await this._repository.update({
      codLocalidad: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = LocalidadService;
