const { HileraRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class HileraService {
  constructor({ codProductor }) {
    this._repository = new HileraRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodHileraCampoSectorCuartelVariedad({ codCampo, codSector, codCuartel, codVariedad, codHilera }) {
    const hilera = await this._repository.findByCodHileraCampoSectorCuartelVariedad({
      codCampo: codCampo,
      codSector: codSector,
      codCuartel: codCuartel,
      codVariedad: codVariedad,
      codHilera: codHilera,
    });

    if (hilera.length <= 0) throw new NotFoundException('La Hilera no existe');

    return hilera[0];
  }

  async create({ hilera }) {
    return await this._repository.create(hilera);
  }

  async update({ hilera, codHilera, codCampo, codCuartel, codSector, codVariedad }) {
    return await this._repository.update({
      codHilera: codHilera,
      codCampo: codCampo,
      codCuartel: codCuartel,
      codSector: codSector,
      codVariedad: codVariedad,
      data: hilera,
    });
  }

  async delete({ codHilera, codCampo, codCuartel, codSector, codVariedad }) {
    await this._repository.update({
      codHilera: codHilera,
      codCampo: codCampo,
      codCuartel: codCuartel,
      codSector: codSector,
      codVariedad: codVariedad,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = HileraService;
