const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Trabajador = require('../models/trabajador.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const Direccion = require('../models/direccion.model');
const Region = require('../models/region.model');
const Comuna = require('../models/comuna.model');
const { loggerError, loggerInfo } = require('../../shared/helpers/logger.helper');

class TrabajadorRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db.sequelize().query(
        `SELECT t.CodTrabajador as codTrabajador,t.NemoTecnico as nemoTecnico,t.Nombres as nombres ,t.PrimerApellido as primerApellido,
            t.SegundoApellido as segundoApellido,t.NombreSocial as nombreSocial,t.fechaNacimiento as fechaNacimiento,
            t.codSexo as codSexo,s.Sexo as sexo ,t.Telefono1 as telefono1,t.Telefono2 as telefono2,t.Email as email,
            t.CodEstadoCivil as codEstadoCivil,es.EstadoCivil as estadoCivil,t.CodPais as codPais,
            p.Pais as pais,t.CodGrupoBins as codGrupoBins,CONVERT (t.CodContratista,NCHAR)as codContratista,
            con.Nombre as nombre ,t.CodCuadrilla as codCuadrilla ,cu.Cuadrilla as cuadrilla ,t.CodPension as codPension ,t.CodPrevision as codPrevision ,pre.AFP as afp,
            t.APV as apv,t.CodUnidadAPV as codUnidadApv,t.Cuenta2 as cuenta2,t.CodUnidadCuenta2 as codUnidadCuenta2,t.CodSalud as codSalud,s.Salud as salud,
            t.PlanSalud as planSalud,t.CodUnidadPlanSalud as codUnidadPlandSalud,t.CodFormaPago as codFormaPago,t.CodBanco as codBanco,
            b.Banco as banco ,t.CodTipoCuenta as codTipoCuenta ,t.NumeroCuenta as numeroCuenta ,t.CodAsignacionFamiliar as codAsignacionFamiliar,
            t.CodObjetado as codObjetado,t.CodUserUpdate as codUserUpdate ,t.Sincro as sincro ,t.CodEstado as codEstado,
            t.FechaCreacion as fechaCreacion,t.fechaActualizacion as fechaActualizacion
            FROM ${database}.TB_RRHH_Trabajador as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo
            LEFT JOIN  appzonec_comun.TB_RRHH_EstadoCivil as es ON t.CodEstadoCivil = es.CodEstadoCivil
            LEFT JOIN ${database}.TB_GRAL_Pais as p ON t.CodPais = p.CodPais
            LEFT JOIN ${database}.TB_COS_Contratista as con ON t.CodContratista = con.CodContratista
            LEFT JOIN ${database}.TB_GRAL_Cuadrilla as cu ON t.CodCuadrilla = cu.CodCuadrilla
            LEFT JOIN ${database}.TB_RRHH_Prevision as pre ON t.CodPrevision = pre.CodPrevision
            LEFT JOIN ${database}.TB_RRHH_Salud as s ON t.CodSalud = s.CodSalud
            LEFT JOIN appzonec_comun.TB_GRAL_Banco as b ON t.CodBanco = b.CodBanco
            WHERE t.CodEstado = 1 OR t.CodEstado = 0`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodTrabajador({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db.sequelize().query(
        `SELECT t.CodTrabajador as codTrabajador,t.NemoTecnico as nemoTecnico,t.Nombres as nombres ,t.PrimerApellido as primerApellido,
            t.SegundoApellido as segundoApellido,t.NombreSocial as nombreSocial,t.fechaNacimiento as fechaNacimiento,
            t.codSexo as codSexo,s.Sexo as sexo ,t.Telefono1 as telefono1,t.Telefono2 as telefono2,t.Email as email,
            t.CodEstadoCivil as codEstadoCivil,es.EstadoCivil as estadoCivil,t.CodPais as codPais,
            p.Pais as pais,t.CodGrupoBins as codGrupoBins,CONVERT (t.CodContratista,NCHAR)as codContratista,
            con.Nombre as nombre ,t.CodCuadrilla as codCuadrilla ,cu.Cuadrilla as cuadrilla ,t.CodPension as codPension ,t.CodPrevision as codPrevision ,pre.AFP as afp,
            t.APV as apv,t.CodUnidadAPV as codUnidadApv,t.Cuenta2 as cuenta2,t.CodUnidadCuenta2 as codUnidadCuenta2,t.CodSalud as codSalud,s.Salud as salud,
            t.PlanSalud as planSalud,t.CodUnidadPlanSalud as codUnidadPlandSalud,t.CodFormaPago as codFormaPago,t.CodBanco as codBanco,
            b.Banco as banco ,t.CodTipoCuenta as codTipoCuenta ,t.NumeroCuenta as numeroCuenta ,t.CodAsignacionFamiliar as codAsignacionFamiliar,
            t.CodObjetado as codObjetado,t.CodUserUpdate as codUserUpdate ,t.Sincro as sincro ,t.CodEstado as codEstado,
            t.FechaCreacion as fechaCreacion,t.fechaActualizacion as fechaActualizacion
            FROM ${database}.TB_RRHH_Trabajador as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo
            LEFT JOIN appzonec_comun.TB_RRHH_EstadoCivil as es ON t.CodEstadoCivil = es.CodEstadoCivil
            LEFT JOIN ${database}.TB_GRAL_Pais as p ON t.CodPais = p.CodPais
            LEFT JOIN ${database}.TB_COS_Contratista as con ON t.CodContratista = con.CodContratista
            LEFT JOIN ${database}.TB_GRAL_Cuadrilla as cu ON t.CodCuadrilla = cu.CodCuadrilla
            LEFT JOIN ${database}.TB_RRHH_Prevision as pre ON t.CodPrevision = pre.CodPrevision
            LEFT JOIN ${database}.TB_RRHH_Salud as s ON t.CodSalud = s.CodSalud
            LEFT JOIN appzonec_comun.TB_GRAL_Banco as b ON t.CodBanco = b.CodBanco
            WHERE t.CodTrabajador = ${cod} AND t.CodEstado = 1 OR t.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodTrabajadorSelect({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT Nombres as nombres, PrimerApellido as primerApellido,
            SegundoApellido as segundoApellido FROM TB_RRHH_Trabajador
            WHERE CodTrabajador = ${cod} AND CodEstado = 1 OR CodEstado = 0`,
      );
      return results;
    } catch (e) {
      loggerError('Error en trabajadores', e);
      throw e;
    }
  }
  async findByCodCuadrilla({ codCuadrilla }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db.sequelize().query(
        `SELECT t.CodTrabajador as codTrabajador,t.NemoTecnico as nemoTecnico,t.Nombres as nombres ,t.PrimerApellido as primerApellido,
            t.SegundoApellido as segundoApellido,t.NombreSocial as nombreSocial,t.fechaNacimiento as fechaNacimiento,
            t.codSexo as codSexo,s.Sexo as sexo ,t.Telefono1 as telefono1,t.Telefono2 as telefono2,t.Email as email,
            t.CodEstadoCivil as codEstadoCivil,es.EstadoCivil as estadoCivil,t.CodPais as codPais,
            CONCAT(t.CodTrabajador, ' — ', t.Nombres, ' ', t.PrimerApellido, ' ', t.SegundoApellido) as nombreCompleto,
            p.Pais as pais,t.CodGrupoBins as codGrupoBins,t.CodContratista as codContratista,
            con.Nombre as nombre ,t.CodCuadrilla as codCuadrilla ,cu.Cuadrilla as cuadrilla ,t.CodPension as codPension ,t.CodPrevision as codPrevision,pre.AFP as afp,
            t.APV as apv,t.CodUnidadAPV as codUnidadApv,t.Cuenta2 as cuenta2,t.CodUnidadCuenta2 as codUnidadCuenta2,t.CodSalud as codSalud,s.Salud as salud,
            t.PlanSalud as planSalud,t.CodUnidadPlanSalud as codUnidadPlandSalud,t.CodFormaPago as codFormaPago,t.CodBanco as codBanco,
            b.Banco as banco ,t.CodTipoCuenta as codTipoCuenta ,t.NumeroCuenta as numeroCuenta ,t.CodAsignacionFamiliar as codAsignacionFamiliar,
            t.CodObjetado as codObjetado,t.CodUserUpdate as codUserUpdate ,t.Sincro as sincro ,t.CodEstado as codEstado,
            t.FechaCreacion as fechaCreacion,t.fechaActualizacion as fechaActualizacion
            FROM ${database}
            .TB_RRHH_Trabajador as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo
            LEFT JOIN  appzonec_comun.TB_RRHH_EstadoCivil as es ON t.CodEstadoCivil = es.CodEstadoCivil
            LEFT JOIN
            ${database}
            .TB_GRAL_Pais as p ON t.CodPais = p.CodPais
            LEFT JOIN
            ${database}
            .TB_COS_Contratista as con ON t.CodContratista = con.CodContratista
            LEFT JOIN
            ${database}
            .TB_GRAL_Cuadrilla as cu ON t.CodCuadrilla = cu.CodCuadrilla
            LEFT JOIN
            ${database}
            .TB_RRHH_Prevision as pre ON t.CodPrevision = pre.CodPrevision
            LEFT JOIN ${database}
            .TB_RRHH_Salud as s ON t.CodSalud = s.CodSalud
            LEFT JOIN appzonec_comun.TB_GRAL_Banco as b ON t.CodBanco = b.CodBanco
            WHERE t.codCuadrilla = ${codCuadrilla} AND t.CodEstado = 1`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findTrabajadoresActivos({ codTrabajador }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db.sequelize().query(
        `SELECT t.CodTrabajador as codTrabajador,t.NemoTecnico as nemoTecnico,t.Nombres as nombres ,t.PrimerApellido as primerApellido,
            t.SegundoApellido as segundoApellido,t.NombreSocial as nombreSocial,t.fechaNacimiento as fechaNacimiento,
            t.codSexo as codSexo,s.Sexo as sexo ,t.Telefono1 as telefono1,t.Telefono2 as telefono2,t.Email as email,
            t.CodEstadoCivil as codEstadoCivil,es.EstadoCivil as estadoCivil,t.CodPais as codPais,
            CONCAT(t.CodTrabajador, ' — ', t.Nombres, ' ', t.PrimerApellido, ' ', t.SegundoApellido) as nombreCompleto,
            p.Pais as pais,t.CodGrupoBins as codGrupoBins,t.CodContratista as codContratista,
            con.Nombre as nombre ,t.CodCuadrilla as codCuadrilla ,cu.Cuadrilla as cuadrilla ,t.CodPension as codPension ,t.CodPrevision as codPrevision,pre.AFP as afp,
            t.APV as apv,t.CodUnidadAPV as codUnidadApv,t.Cuenta2 as cuenta2,t.CodUnidadCuenta2 as codUnidadCuenta2,t.CodSalud as codSalud,s.Salud as salud,
            t.PlanSalud as planSalud,t.CodUnidadPlanSalud as codUnidadPlandSalud,t.CodFormaPago as codFormaPago,t.CodBanco as codBanco,
            b.Banco as banco ,t.CodTipoCuenta as codTipoCuenta ,t.NumeroCuenta as numeroCuenta ,t.CodAsignacionFamiliar as codAsignacionFamiliar,
            t.CodObjetado as codObjetado,t.CodUserUpdate as codUserUpdate ,t.Sincro as sincro ,t.CodEstado as codEstado,
            t.FechaCreacion as fechaCreacion,t.fechaActualizacion as fechaActualizacion
            FROM ${database}
            .TB_RRHH_Trabajador as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo
            LEFT JOIN  appzonec_comun.TB_RRHH_EstadoCivil as es ON t.CodEstadoCivil = es.CodEstadoCivil
            LEFT JOIN
            ${database}
            .TB_GRAL_Pais as p ON t.CodPais = p.CodPais
            LEFT JOIN
            ${database}
            .TB_COS_Contratista as con ON t.CodContratista = con.CodContratista
            LEFT JOIN
            ${database}
            .TB_GRAL_Cuadrilla as cu ON t.CodCuadrilla = cu.CodCuadrilla
            LEFT JOIN
            ${database}
            .TB_RRHH_Prevision as pre ON t.CodPrevision = pre.CodPrevision
            LEFT JOIN ${database}
            .TB_RRHH_Salud as s ON t.CodSalud = s.CodSalud
            LEFT JOIN appzonec_comun.TB_GRAL_Banco as b ON t.CodBanco = b.CodBanco
            WHERE t.CodEstado = 1 AND t.CodCuadrilla IS NULL OR t.codTrabajador = ${codTrabajador}`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async create({ data, direcciones }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        /**
         *
         * COMIENZO de CREACIÓN DEL TRABAJADOR
         */
        const codTrabajador = data.codTrabajador;
        const trabajadorCreated = await Trabajador(codProductor, lng).create(
          {
            ...data,
            codTrabajador: codTrabajador,
            fechaCreacion: new Date(),
            lastModified: dateNumber(),
            sincro: 1,
            codUserUpdate: 1,
          },
          { transaction: t },
        );

        /**
         *
         * FIN de CREACIÓN DEL Trabajador
         */

        /**
         *
         * COMIENZO de CREACIÓN DE LAS DIRECCIONES
         */
        let direccionCreatedArray = [];
        for (let i = 0; i < direcciones.length; i++) {
          let comuna = await Comuna(codProductor, lng).findOne({
            where: {
              codComuna: direcciones[i].codComuna,
            },
          });

          let region = await Region(codProductor, lng).findOne({
            where: {
              codRegion: comuna.codRegion,
            },
          });

          let direccionCreated = {
            ...direcciones[i],
            codRegion: region.codRegion,
            codPais: region.codPais,
            codTablaEntidad: 48,
            codEntidad: trabajadorCreated.codTrabajador.toString(),
          };

          let direccionCreatedNew = await Direccion(codProductor, lng).create(
            {
              ...direccionCreated,
              codDireccion: dateNumber(),
              codEstado: 1,
              lastModified: dateNumber(),
              sincro: 1,
              codUserUpdate: 1,
            },
            { transaction: t },
          );
          direccionCreatedArray.push(direccionCreatedNew);
        }

        /**
         *
         * FIN CREACIÓN DE LAS DIRECCIONES
         */

        return Promise.all(direccionCreatedArray)
          .then(function (result) {
            loggerInfo('funciono', result);
          })
          .catch(function (err) {
            loggerError('error', err);
          });
      });
    } catch (e) {
      throw e;
    }
  }

  async createMasivo(data) {
    try {
      const codProductor = this._cod;
      const lng = this._lng;

      const trabajadores = data.map(item => {
        return {
          ...item,
          fechaCreacion: new Date(),
          lastModified: dateNumber(),
          sincro: 1,
          codUserUpdate: 1,
          codEstado: 1,
        };
      });

      await Trabajador(codProductor, lng).bulkCreate(trabajadores);
    } catch (e) {
      throw e;
    }
  }

  async updateMasivo(data) {
    const codProductor = this._cod;
    const lng = this._lng;

    const trabajadores = data.trabajador.map(trabajador => {
      return {
        ...trabajador,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
        sincro: 1,
        codUserUpdate: 1,
        codEstado: 1,
      };
    });

    const props = Object.keys(trabajadores[0]);

    await Trabajador(codProductor, lng).bulkCreate(trabajadores, {
      updateOnDuplicate: props,
    });
  }

  async update({ codTrabajador, data, direcciones }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        /**
         *
         * COMIENZO de ACTUALIZACIÓN DEl TRABAJADOR
         */
        const trabajador = await Trabajador(codProductor, lng).findByPk(codTrabajador);

        if (trabajador === null) {
          throw new NotFoundException(lng('notFound'));
        }

        //actualizando trabajador
        await trabajador.update(
          {
            ...data,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          { transaction: t },
        );
        /**
         *
         * FIN de ACTUALIZACIÓN DEL trabajador
         */

        /**
         *
         * COMIENZO de ACTUALIZACIÓN DE LAS DIRECCIONES
         */

        // eliminación de las direcciones antiguas
        await Direccion(codProductor, lng).destroy(
          {
            where: {
              codEntidad: trabajador.codTrabajador,
            },
          },
          { transaction: t },
        );

        // creación de las nuevas direcciones
        let direccionUpdatedArray = [];
        for (let i = 0; i < direcciones.length; i++) {
          let comuna = await Comuna(codProductor, lng).findOne({
            where: {
              codComuna: direcciones[i].codComuna,
            },
          });

          let region = await Region(codProductor, lng).findOne({
            where: {
              codRegion: comuna.codRegion,
            },
          });
          let direccionUpdated = {
            ...direcciones[i],
            codRegion: region.codRegion,
            codDireccion: dateNumber(),
            codPais: region.codPais,
            codTablaEntidad: 48,
            codEntidad: trabajador.codTrabajador.toString(),
            codEstado: 1,
            lastModified: dateNumber(),
            sincro: 1,
            codUserUpdate: 1,
          };

          let direccionUpdatedNew = await Direccion(codProductor, lng).create(
            {
              ...direccionUpdated,
            },
            { transaction: t },
          );
          direccionUpdatedArray.push(direccionUpdatedNew);
        }

        /**
         *
         * FIN DE ACTUALIZACIÓN DE LAS DIRECCIONES
         */

        return Promise.all(direccionUpdatedArray)
          .then(function (result) {
            loggerInfo('funciono', result);
          })
          .catch(function (err) {
            loggerError('error', err);
          });
      });
    } catch (e) {
      throw e;
    }
  }

  async delete({ codTrabajador }) {
    const trabajador = await Trabajador(this._cod, this._lng).findByPk(codTrabajador);

    if (trabajador === null) {
      throw new NotFoundException(this._lng('notFound'));
    }
    //actualizando empresa
    await trabajador.update({
      fechaActualizacion: new Date(),
      lastModified: dateNumber(),
      codEstado: 2,
    });
  }
}

module.exports = TrabajadorRepository;
