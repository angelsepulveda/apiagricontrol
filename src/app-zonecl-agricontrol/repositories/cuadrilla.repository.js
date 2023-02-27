const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Cuadrilla = require('../models/cuadrilla.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const Trabajador = require('../models/trabajador.model');
const { loggerInfo, loggerError } = require('../../shared/helpers/logger.helper');

class CuadrillaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }
  async findAll() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT c.CodCuadrilla as codCuadrilla,CONVERT(c.CodJefeCuadrilla,NCHAR) as codJefeCuadrilla, c.NemoTecnico as nemoTecnico,CONVERT(c.CodCampo,NCHAR) as codCampo, ca.Campo as campo,
          c.Cuadrilla as cuadrilla, c.ImeiEquipo as imeiEquipo,c.CodUserUpdate as codUserUpdate, c.FechaCreacion as fechaCreacion,
          c.FechaActualizacion as fechaActualizacion, c.CodEstado as codEstado
           FROM TB_GRAL_Cuadrilla as c LEFT JOIN TB_GRAL_Campo as ca ON c.CodCampo = ca.codCampo
          WHERE c.CodEstado = 1 OR c.CodEstado = 0`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findAllCodCampo({ codCampos }) {
    try {
      let whereCampos = ' ';

      codCampos.forEach(campo => (whereCampos = whereCampos + `c.CodCampo = ${campo.codCampo} or `));

      whereCampos = whereCampos.substring(0, whereCampos.length - 3);

      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT c.CodCuadrilla as codCuadrilla,CONVERT(c.CodJefeCuadrilla,NCHAR) as codJefeCuadrilla, c.NemoTecnico as nemoTecnico,CONVERT(c.CodCampo,NCHAR) as codCampo, ca.Campo as campo,
          c.Cuadrilla as cuadrilla, c.ImeiEquipo as imeiEquipo,c.CodUserUpdate as codUserUpdate, c.FechaCreacion as fechaCreacion,
          c.FechaActualizacion as fechaActualizacion, c.CodEstado as codEstado
           FROM TB_GRAL_Cuadrilla as c LEFT JOIN TB_GRAL_Campo as ca ON c.CodCampo = ca.codCampo
          WHERE c.CodEstado = 1 OR c.CodEstado = 0 and ${whereCampos}  `,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async find() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT c.CodCuadrilla as codCuadrilla,CONVERT(c.CodJefeCuadrilla,NCHAR) as codJefeCuadrilla, c.NemoTecnico as nemoTecnico, CONVERT(c.CodCampo,NCHAR) as codCampo, ca.Campo as campo,
          c.Cuadrilla as cuadrilla, c.ImeiEquipo as imeiEquipo,c.CodUserUpdate as codUserUpdate, c.FechaCreacion as fechaCreacion,
          c.FechaActualizacion as fechaActualizacion, c.CodEstado as codEstado
           FROM TB_GRAL_Cuadrilla as c LEFT JOIN TB_GRAL_Campo as ca ON c.CodCampo = ca.codCampo WHERE c.ImeiEquipo is not null `,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCuadrilla({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT c.CodCuadrilla as codCuadrilla, CONVERT(c.CodJefeCuadrilla,NCHAR) as codJefeCuadrilla, c.NemoTecnico as nemoTecnico,CONVERT(c.CodCampo,NCHAR) as codCampo, ca.Campo as campo,
            c.Cuadrilla as cuadrilla, c.ImeiEquipo as imeiEquipo, c.CodEstado as codEstado
             FROM TB_GRAL_Cuadrilla as c LEFT JOIN TB_GRAL_Campo as ca ON c.CodCampo = ca.codCampo
            WHERE c.CodCuadrilla = ${cod} AND c.CodEstado = 1 OR c.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create({ data, trabajadores }) {
    try {
      const codProductor = this._cod;

      const db = new AppZoneAgriControlDB({ codProductor: codProductor });

      const codCuadrilla = dateNumber();

      await db.sequelize().transaction(async t => {
        await Cuadrilla(codProductor, this._lng).create(
          {
            ...data,
            codCuadrilla: codCuadrilla,
            fechaCreacion: new Date(),
            lastModified: dateNumber(),
            codUserUpdate: 2,
            sincro: 1,
          },
          { transaction: t },
        );

        for (let i = 0; i < trabajadores.length; i++) {
          const trabajador = await Trabajador(codProductor, this._lng).findByPk(trabajadores[i].codTrabajador);

          if (trabajador === null) {
            throw new NotFoundException(this._lng('notFound'));
          }

          await trabajador.update(
            {
              codCuadrilla: codCuadrilla,
              fechaActualizacion: new Date(),
              lastModified: dateNumber(),
              codUserUpdate: 2,
            },
            { transaction: t },
          );
        }

        return Promise.all(codProductor)
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
  async update({ codCuadrilla, data, trabajadores }) {
    try {
      const codProductor = this._cod;
      const lng = this._lng;
      const db = new AppZoneAgriControlDB({ codProductor: codProductor });

      await db.sequelize().transaction(async t => {
        const cuadrilla = await Cuadrilla(codProductor, lng).findByPk(codCuadrilla, { transaction: t });

        if (cuadrilla === null) {
          throw new NotFoundException(lng('notFound'));
        }

        await cuadrilla.update(
          {
            ...data,
            fechaActualizacion: new Date(),
            codUserUpdate: 2,
            sincro: 1,
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        await Trabajador(codProductor).update(
          { codCuadrilla: null },
          { where: { codCuadrilla: codCuadrilla }, transaction: t },
        );

        for (let i = 0; i < trabajadores.length; i++) {
          const trabajador = await Trabajador(codProductor, lng).findByPk(trabajadores[i].codTrabajador);

          if (trabajador === null) {
            throw new NotFoundException(lng('notFound'));
          }

          await trabajador.update(
            {
              codCuadrilla: codCuadrilla,
              fechaActualizacion: new Date(),
              lastModified: dateNumber(),
              codUserUpdate: 2,
            },
            { transaction: t },
          );
        }

        return Promise.all(codProductor)
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

  async delete({ codCuadrilla }) {
    try {
      const codProductor = this._cod;
      const lng = this._lng;

      const db = new AppZoneAgriControlDB({ codProductor: codProductor });

      await db.sequelize().transaction(async t => {
        const cuadrilla = await Cuadrilla(codProductor, lng).update(
          {
            codEstado: 2,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
            codUserUpdate: 2,
            sincro: 1,
          },
          {
            where: { codCuadrilla: codCuadrilla },
          },
          { transaction: t },
        );

        await Trabajador(codProductor, lng).update(
          {
            codCuadrilla: null,
            codUserUpdate: 2,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          {
            where: { codCuadrilla: codCuadrilla },
          },
          { transaction: t },
        );

        return Promise.all(cuadrilla)
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
}

module.exports = CuadrillaRepository;
