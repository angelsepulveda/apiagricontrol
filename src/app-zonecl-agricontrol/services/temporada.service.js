const { TemporadaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TemporadaService {
  constructor({ codProductor, lng }) {
    this._lng = lng;
    this._repository = new TemporadaRepository({ codProductor: codProductor, lng: lng });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodTemporada({ cod }) {
    const temporada = await this._repository.findByCodTemporada({ cod: cod });

    if (temporada.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return temporada[0];
  }

  async create({ temporada }) {
    return await this._repository.create(temporada);
  }

  async update({ temporada, cod }) {
    return await this._repository.update({
      codTemporada: cod,
      data: temporada,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codTemporada: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = TemporadaService;
