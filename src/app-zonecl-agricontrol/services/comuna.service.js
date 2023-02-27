const { ComunaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { ComunaMasterService } = require('../../app-zonecl-comun/services');

class ComunaService {
  constructor({ codProductor, lng }) {
    this._repository = new ComunaRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodComuna({ cod }) {
    const comuna = await this._repository.findByCodComuna({ cod: cod });

    if (comuna.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return comuna[0];
  }

  async create({ codComunaMaster }) {
    const comunaMasterService = new ComunaMasterService();
    const comuna = await comunaMasterService.findByCodComuna({ cod: codComunaMaster });
    return await this._repository.create({
      codComuna: comuna.codComuna,
      codRegion: comuna.codRegion,
      comuna: comuna.comuna,
      nemoTecnico: comuna.nemoTecnico,
      codEstado: comuna.codEstado,
      sincro: 1,
    });
  }

  async delete({ cod }) {
    await this._repository.delete({ cod: cod });
  }
}

module.exports = ComunaService;
