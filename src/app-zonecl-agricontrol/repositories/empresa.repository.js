const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Empresa = require('../models/empresa.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const Direccion = require('../models/direccion.model');
const Region = require('../models/region.model');
const Comuna = require('../models/comuna.model');
const { loggerInfo, loggerError } = require('../../shared/helpers/logger.helper');

class EmpresaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT CONVERT(e.CodEmpresa,NCHAR) as codEmpresa,e.NemoTecnico as nemoTecnico ,e.DNI as dni ,e.RazonSocial as razonSocial ,e.Giro as giro ,e.DNIRepLegal as dniRepLegal ,
                   e.RepLegal as repLegal,e.CodMutualidad as codMutualidad,m.Mutualidad as mutuliadad ,e.FactorMutualidad as factorMutualidad,
                   e.CodCajaCompensacion as codCajaCompensacion,c.CajaCompensacion as cajaCompensacion,
                   e.FactorCajaCompensacion as factorCajaCompensacion,e.AjustarSueldoMinimo as ajustarSueldoMinimo,
                   e.CodEstado as codEstado FROM TB_GRAL_Empresa as e LEFT JOIN TB_RRHH_Mutualidad as m ON e.CodMutualidad = m.CodMutualidad
                   LEFT JOIN TB_RRHH_CajaCompensacion as c ON e.CodCajaCompensacion = c.CodCajaCompensacion
                   WHERE e.CodEstado = 1 OR e.CodEstado = 0`;

      const [results] = await db.sequelize().query(sql);
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodEmpresa({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT CONVERT(e.CodEmpresa,NCHAR) as codEmpresa,e.NemoTecnico as nemoTecnico ,e.DNI as dni ,e.RazonSocial as razonSocial ,e.Giro as giro ,e.DNIRepLegal as dniRepLegal,
                    e.RepLegal as repLegal,e.CodMutualidad as codMutualidad ,m.Mutualidad as mutuliadad ,e.FactorMutualidad as factorMutualidad,
                    e.CodCajaCompensacion as codCajaCompensacion,c.CajaCompensacion as cajaCompensacion,e.FactorCajaCompensacion as factorCajaCompensacion,e.AjustarSueldoMinimo as ajustarSueldoMinimo,
                    e.CodEstado as codEstado FROM TB_GRAL_Empresa as e  LEFT JOIN TB_RRHH_Mutualidad as m ON e.CodMutualidad = m.CodMutualidad
                    LEFT JOIN TB_RRHH_CajaCompensacion as c ON e.CodCajaCompensacion = c.CodCajaCompensacion WHERE e.CodEmpresa = ${cod}
                    AND e.CodEstado = 1 OR e.CodEstado = 0`;

      const [results] = await db.sequelize().query(sql);

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
         * COMIENZO de CREACIÓN DE LA EMPRESA
         */
        const codEmpresa = dateNumber();
        const empresaCreated = await Empresa(codEmpresa, lng).create(
          {
            ...data,
            codEmpresa: codEmpresa,
            fechaCreacion: new Date(),
            lastModified: dateNumber(),
            sincro: 1,
            codUserUpdate: 1,
          },
          { transaction: t },
        );

        /**
         *
         * FIN de CREACIÓN DE LA EMPRESA
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
            codTablaEntidad: 21,
            codEntidad: empresaCreated.codEmpresa.toString(),
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

  async update({ codEmpresa, data, direcciones }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        /**
         *
         * COMIENZO de ACTUALIZACIÓN DE LA EMPRESA
         */
        const empresa = await Empresa(codProductor, lng).findByPk(codEmpresa);

        if (empresa === null) {
          throw new NotFoundException('La empresa no se encuentra registrada');
        }

        //actualizando empresa
        await empresa.update(
          {
            ...data,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        /**
         *
         * FIN de ACTUALIZACIÓN DE LA EMPRESA
         */

        /**
         *
         * COMIENZO de ACTUALIZACIÓN DE LAS DIRECCIONES
         */

        // eliminación de las direcciones antiguas
        await Direccion(codProductor, lng).destroy(
          {
            where: {
              codEntidad: empresa.codEmpresa,
            },
          },
          { transaction: t },
        );

        // creación de las nuevas direcciones
        let direccionUpdatedArray = [];
        for (let i = 0; i < direcciones.length; i++) {
          let comuna = await Comuna(codProductor).findOne({
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
            codTablaEntidad: 21,
            codEntidad: empresa.codEmpresa.toString(),
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

  async delete({ codEmpresa }) {
    const empresa = await Empresa(this._cod, this._lng).findByPk(codEmpresa, this._lng);

    if (empresa === null) {
      throw new NotFoundException(this._lng('notFound'));
    }
    //actualizando empresa
    await empresa.update({
      fechaActualizacion: new Date(),
      lastModified: dateNumber(),
      codEstado: 2,
    });
  }
}

module.exports = EmpresaRepository;
