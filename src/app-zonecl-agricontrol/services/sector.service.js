const { SectorRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class SectorService {
  constructor({ codProductor, lng }) {
    this._repository = new SectorRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findAllCodCampo({ campos }) {
    const codCampos = campos.map(campo => {
      return { codCampo: campo.codCampo };
    });

    return await this._repository.findAllCodCampo({ codCampos: codCampos });
  }

  async findByCodSector({ cod }) {
    const sector = await this._repository.findByCodSector({ cod: cod });

    if (sector.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return sector[0];
  }

  async findByCodCampo({ cod }) {
    const sectores = await this._repository.findByCodCampo({ cod: cod });

    if (sectores.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return sectores;
  }

  async create({ sector }) {
    return await this._repository.create(sector);
  }

  async update({ sector, cod }) {
    return await this._repository.update({
      codSector: cod,
      data: sector,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codSector: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = SectorService;
