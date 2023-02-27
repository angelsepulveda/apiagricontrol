const { NotFoundException } = require('../../shared/exceptions');
const { CalidadRepository } = require('../repositories');

class CalidadService {
  constructor({ codProductor, lng }) {
    this._repository = new CalidadRepository({ codProductor: codProductor, lng: lng });
    this._lng - lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodCalidad({ cod }) {
    const calidad = await this._repository.findByCodCalidad({ cod: cod });

    if (calidad === null) throw new NotFoundException(this._lng('notFound'));

    return calidad;
  }
  async create({ calidad }) {
    return await this._repository.create(calidad);
  }

  async update({ calidad, cod }) {
    return await this._repository.update({
      cod: cod,
      data: calidad,
    });
  }
  async delete({ cod }) {
    await this._repository.update({
      codCalidad: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = CalidadService;
