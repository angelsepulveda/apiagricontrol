const { CuartelRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class CuartelService {
  constructor({ codProductor, lng }) {
    this._repository = new CuartelRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findAllCodCampo({ campos }) {
    const codCampos = campos.map(campo => {
      return { codCampo: campo.codCampo };
    });

    return await this._repository.findAllCodCampo({ codCampos: codCampos });
  }

  async findByCodCuartel({ codCuartel }) {
    const cuartel = await this._repository.findByCodCuartel({ codCuartel: codCuartel });

    if (cuartel.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return cuartel[0];
  }

  async create({ cuartel }) {
    return await this._repository.create({
      data: {
        codCuartel: cuartel.codCuartel,
        codCampo: cuartel.codCampo,
        codSector: cuartel.codSector,
        nombreCorto: cuartel.nombreCorto,
        nemoTecnico: cuartel.nemoTecnico,
        cuartel: cuartel.cuartel,
        anioPlantacion: cuartel.anioPlantacion,
        superficie: cuartel.superficie,
        codTipoCobertura: cuartel.codTipoCobertura,
        organico: cuartel.organico,
        productivo: cuartel.productivo,
        entreHilera: cuartel.entreHilera,
        sobreHilera: cuartel.sobreHilera,
        numPlantasPorHa: cuartel.numPlantasPorHa,
        codClasificacionDensidad: cuartel.codClasificacionDensidad,
        codEstado: cuartel.codEstado,
      },
      cuartelesVariedades: cuartel.cuartelesVariedades,
    });
  }

  async update({ cuartel, codCuartel }) {
    return await this._repository.update({
      codCuartel: codCuartel,
      data: {
        codCuartel: cuartel.codCuartel,
        codCampo: cuartel.codCampo,
        codSector: cuartel.codSector,
        nombreCorto: cuartel.nombreCorto,
        nemoTecnico: cuartel.nemoTecnico,
        superficie: cuartel.superficie,
        cuartel: cuartel.cuartel,
        anioPlantacion: cuartel.anioPlantacion,
        codTipoCobertura: cuartel.codTipoCobertura,
        organico: cuartel.organico,
        productivo: cuartel.productivo,
        entreHilera: cuartel.entreHilera,
        sobreHilera: cuartel.sobreHilera,
        numPlantasPorHa: cuartel.numPlantasPorHa,
        codClasificacionDensidad: cuartel.codClasificacionDensidad,
        codEstado: cuartel.codEstado,
      },
      cuartelesVariedades: cuartel.cuartelesVariedades,
    });
  }

  async delete({ codCuartel }) {
    await this._repository.update({
      codCuartel: codCuartel,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = CuartelService;
