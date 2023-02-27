const { EmpresaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class EmpresaService {
  constructor({ codProductor, lng }) {
    this._repository = new EmpresaRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodEmpresa({ cod }) {
    const empresa = await this._repository.findByCodEmpresa({ cod: cod });

    if (empresa.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return empresa[0];
  }

  async create({ empresa }) {
    return await this._repository.create({
      data: {
        razonSocial: empresa.razonSocial,
        dni: empresa.dni,
        giro: empresa.giro,
        nemoTecnico: empresa.nemoTecnico,
        dniRepLegal: empresa.dniRepLegal,
        repLegal: empresa.repLegal,
        codMutualidad: empresa.codMutualidad,
        codCajaCompensacion: empresa.codCajaCompensacion,
        factorCajaCompensacion: empresa.factorCajaCompensacion,
        factorMutualidad: empresa.factorMutualidad,
        ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
        codEstado: empresa.codEstado,
      },
      direcciones: empresa.direcciones,
    });
  }

  async update({ empresa, cod }) {
    return await this._repository.update({
      codEmpresa: cod,
      data: {
        razonSocial: empresa.razonSocial,
        dni: empresa.dni,
        giro: empresa.giro,
        nemoTecnico: empresa.nemoTecnico,
        dniRepLegal: empresa.dniRepLegal,
        repLegal: empresa.repLegal,
        codMutualidad: empresa.codMutualidad,
        codCajaCompensacion: empresa.codCajaCompensacion,
        factorCajaCompensacion: empresa.factorCajaCompensacion,
        factorMutualidad: empresa.factorMutualidad,
        ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
        codEstado: empresa.codEstado,
      },
      direcciones: empresa.direcciones,
    });
  }

  async delete({ cod }) {
    return await this._repository.delete({ codEmpresa: cod });
  }
}

module.exports = EmpresaService;
