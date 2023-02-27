const { EspecieRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { EspecieMasterService } = require('../../app-zonecl-comun/services');

class EspecieService {
  constructor({ codProductor, lng }) {
    this._repository = new EspecieRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodEspecie({ cod }) {
    const especie = await this._repository.findByCodEspecie({ cod: cod });

    if (especie === null) throw new NotFoundException(this.lng('notFound'));

    return especie;
  }

  async create({ codEspecieMaster }) {
    const especieMasterService = new EspecieMasterService();
    const especie = await especieMasterService.findByCodEspecie({ cod: codEspecieMaster });

    return await this._repository.create({
      codEspecie: especie.codEspecie,
      especie: especie.especie,
      nemoTecnico: especie.nemoTecnico,
      codEstado: especie.codEstado,
      sincro: 1,
    });
  }

  async delete({ cod }) {
    await this._repository.delete({ cod: cod });
  }
}

module.exports = EspecieService;
