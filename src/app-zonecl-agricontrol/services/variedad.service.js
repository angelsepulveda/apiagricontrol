const { VariedadRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { VariedadMasterService } = require('../../app-zonecl-comun/services');

class VariedadService {
  constructor({ codProductor, lng }) {
    this._repository = new VariedadRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodVariedad({ cod }) {
    const variedad = await this._repository.findByCodVariedad({ cod: cod });

    if (variedad.length === 0) {
      return null;
    }
    return variedad[0];
  }

  async findByCodEspecie({ cod }) {
    return await this._repository.findByCodEspecie({ cod: cod });
  }

  async create({ codVariedadMaster }) {
    const variedad = await this.findByCodVariedad({ cod: codVariedadMaster });

    if (variedad !== null) {
      if (variedad.codEstado !== 1) {
        return await this._repository.update({
          cod: variedad.codVariedad,
          data: {
            codEstado: 1,
          },
        });
      } else {
        throw new NotFoundException(this._lng('notFound'));
      }
    }

    const variedadMaterService = new VariedadMasterService({ lng: this._lng });
    const variedadMaster = await variedadMaterService.findByCodVariedad({ cod: codVariedadMaster });

    return await this._repository.create({
      codVariedad: variedadMaster.codVariedad,
      codEspecie: variedadMaster.codEspecie,
      variedad: variedadMaster.variedad,
      nombreCorto: variedadMaster.nombreCorto,
      nemoTecnico: variedadMaster.nemoTecnico,
      sincro: 0,
    });
  }

  async delete({ cod }) {
    await this._repository.update({ cod: cod, data: { codEstado: 2 } });
  }
}

module.exports = VariedadService;
