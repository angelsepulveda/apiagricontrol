const { CuadrillaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class CuadrillaService {
  constructor({ codProductor, lng }) {
    this._repository = new CuadrillaRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findAllCodCampo({ campos }) {
    const codCampos = campos.map(campo => {
      return { codCampo: campo.codCampo };
    });

    return await this._repository.findAllCodCampo({ codCampos: codCampos });
  }

  async findByCodCuadrilla({ cod }) {
    const cuadrilla = await this._repository.findByCodCuadrilla({ cod: cod });

    if (cuadrilla.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return cuadrilla[0];
  }

  async create({ cuadrilla }) {
    return await this._repository.create({
      data: {
        nemoTecnico: cuadrilla.nemoTecnico,
        cuadrilla: cuadrilla.cuadrilla,
        codJefeCuadrilla: parseInt(cuadrilla.codJefeCuadrilla),
        codCampo: cuadrilla.codCampo,
        imeiEquipo: cuadrilla.imeiEquipo,
        codEstado: cuadrilla.codEstado,
      },
      trabajadores: cuadrilla.trabajadores,
    });
  }

  async update({ cuadrilla, cod }) {
    return await this._repository.update({
      codCuadrilla: cod,
      data: {
        nemoTecnico: cuadrilla.nemoTecnico,
        cuadrilla: cuadrilla.cuadrilla,
        codJefeCuadrilla: parseInt(cuadrilla.codJefeCuadrilla),
        codCampo: cuadrilla.codCampo,
        imeiEquipo: cuadrilla.imeiEquipo,
        codEstado: cuadrilla.codEstado,
      },
      trabajadores: cuadrilla.trabajadores,
    });
  }

  async delete({ cod }) {
    await this._repository.delete({
      codCuadrilla: cod,
    });
  }
}

module.exports = CuadrillaService;
