const { TrabajadorRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class TrabajadorService {
  constructor({ codProductor, lng }) {
    this._repository = new TrabajadorRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findTrabajadoresActivos({ codTrabajador }) {
    return await this._repository.findTrabajadoresActivos({ codTrabajador });
  }

  async findByCodCuadrilla({ codCuadrilla }) {
    return await this._repository.findByCodCuadrilla({ codCuadrilla: codCuadrilla });
  }

  async findByCodTrabajador({ cod }) {
    const trabajador = await this._repository.findByCodTrabajador({ cod: cod });

    if (trabajador.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return trabajador[0];
  }

  async findByCodTrabajadorSelect({ cod }) {
    const trabajador = await this._repository.findByCodTrabajadorSelect({ cod: cod });

    if (trabajador.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return trabajador[0];
  }

  async create({ trabajador }) {
    return await this._repository.create({
      data: {
        codTrabajador: trabajador.codTrabajador,
        nemoTecnico: trabajador.nemoTecnico,
        nombres: trabajador.nombres,
        primerApellido: trabajador.primerApellido,
        segundoApellido: trabajador.segundoApellido,
        nombreSocial: trabajador.nombreSocial,
        fechaNacimiento: trabajador.fechaNacimiento,
        codSexo: trabajador.codSexo,
        telefono1: trabajador.telefono1,
        telefono2: trabajador.telefono2,
        email: trabajador.email,
        codPais: trabajador.codPais,
        codGrupoBins: trabajador.codGrupoBins,
        codCuadrilla: trabajador.codCuadrilla,
        codContratista: trabajador.codContratista,
        codEstadoCivil: trabajador.codEstadoCivil,
        codBanco: trabajador.codBanco,
        codTipoCuenta: trabajador.codTipoCuenta,
        numeroCuenta: trabajador.numeroCuenta,
        codFormaPago: trabajador.codFormaPago,
        codObjetado: trabajador.codObjetado,
        codPrevision: trabajador.codPrevision,
        codPension: trabajador.codPension,
        apv: trabajador.apv,
        codUnidadApv: trabajador.codUnidadApv,
        cuenta2: trabajador.cuenta2,
        codUnidadCuenta2: trabajador.codUnidadCuenta2,
        codSalud: trabajador.codSalud,
        planSalud: trabajador.planSalud,
        codUnidadPlandSalud: trabajador.codUnidadPlandSalud,
        codAsignacionFamiliar: trabajador.codAsignacionFamiliar,
        codEstado: trabajador.codEstado,
      },
      direcciones: trabajador.direcciones,
    });
  }

  async createMasiva(data) {
    await this._repository.createMasivo(data);
  }

  async updateMasivo(data) {
    await this._repository.updateMasivo(data);
  }
  async update({ trabajador, cod }) {
    return await this._repository.update({
      codTrabajador: cod,
      data: {
        nemoTecnico: trabajador.nemoTecnico,
        nombres: trabajador.nombres,
        primerApellido: trabajador.primerApellido,
        segundoApellido: trabajador.segundoApellido,
        nombreSocial: trabajador.nombreSocial,
        fechaNacimiento: trabajador.fechaNacimiento,
        codSexo: trabajador.codSexo,
        telefono1: trabajador.telefono1,
        telefono2: trabajador.telefono2,
        email: trabajador.email,
        codPais: trabajador.codPais,
        codGrupoBins: trabajador.codGrupoBins,
        codCuadrilla: trabajador.codCuadrilla,
        codContratista: trabajador.codContratista,
        codEstadoCivil: trabajador.codEstadoCivil,
        codBanco: trabajador.codBanco,
        codTipoCuenta: trabajador.codTipoCuenta,
        numeroCuenta: trabajador.numeroCuenta,
        codFormaPago: trabajador.codFormaPago,
        codObjetado: trabajador.codObjetado,
        codPrevision: trabajador.codPrevision,
        codPension: trabajador.codPension,
        apv: trabajador.apv,
        codUnidadApv: trabajador.codUnidadApv,
        cuenta2: trabajador.cuenta2,
        codUnidadCuenta2: trabajador.codUnidadCuenta2,
        codSalud: trabajador.codSalud,
        planSalud: trabajador.planSalud,
        codUnidadPlandSalud: trabajador.codUnidadPlandSalud,
        codAsignacionFamiliar: trabajador.codAsignacionFamiliar,
        codEstado: trabajador.codEstado,
      },
      direcciones: trabajador.direcciones,
    });
  }

  async delete({ cod }) {
    return await this._repository.delete({ codTrabajador: cod });
  }
}

module.exports = TrabajadorService;
