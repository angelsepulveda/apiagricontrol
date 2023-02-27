const { PaisRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { PaisMasterService } = require('../../app-zonecl-comun/services');

class PaisService {
  constructor({ codProductor, lng }) {
    this._repository = new PaisRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodPais({ cod }) {
    return await this._repository.findByCodPais({ cod: cod });
  }

  async create({ codPaisMaster }) {
    const pais = await this.findByCodPais({ cod: codPaisMaster });
    if (pais !== null) {
      if (pais.codEstado !== 1) {
        return await this._repository.update({
          cod: pais.codPais,
          data: {
            codEstado: 1,
          },
        });
      } else {
        throw new NotFoundException(this._lng('exits'));
      }
    }
    const paisMasterService = new PaisMasterService({ lng: this._lng });
    const paisMaster = await paisMasterService.findByCodPais({ cod: codPaisMaster });
    return await this._repository.create({
      codPais: paisMaster.codPais,
      pais: paisMaster.pais,
      gentilicio: paisMaster.gentilicio,
      codEstado: paisMaster.codEstado,
      nacional: paisMaster.nacional,
      sincro: 1,
    });
  }

  async delete({ cod }) {
    await this._repository.update({ cod: cod, data: { codEstado: 2 } });
  }
}

module.exports = PaisService;
