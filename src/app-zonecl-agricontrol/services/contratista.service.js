const { ContratistaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class ContratistaService {
  constructor({ codProductor, lng }) {
    this._repository = new ContratistaRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodContratista({ cod }) {
    const contratista = await this._repository.findByCodContratista({ cod: cod });

    if (contratista === null) throw new NotFoundException(this._lng('notFound'));

    return contratista;
  }

  async create({ contratista }) {
    return await this._repository.create(contratista);
  }

  async update({ contratista, cod }) {
    return await this._repository.update({
      cod: cod,
      data: contratista,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      cod: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = ContratistaService;
