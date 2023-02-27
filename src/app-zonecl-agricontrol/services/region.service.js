const { RegionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { RegionMasterService } = require('../../app-zonecl-comun/services');

class RegionService {
  constructor({ codProductor, lng }) {
    this._repository = new RegionRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodRegion({ cod }) {
    const region = await this._repository.findByCodRegion({ cod: cod });

    if (region.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return region[0];
  }

  async create({ codRegionMaster }) {
    const regionMasterService = new RegionMasterService({ lng: this._lng });
    const region = await regionMasterService.findByCodRegion({ cod: codRegionMaster });
    return await this._repository.create({
      codRegion: region.codRegion,
      codPais: region.codPais,
      region: region.region,
      nemoTecnico: region.nemoTecnico,
      codEstado: region.codEstado,
      sincro: 1,
    });
  }

  async delete({ cod }) {
    await this._repository.delete({ cod: cod });
  }
}

module.exports = RegionService;
