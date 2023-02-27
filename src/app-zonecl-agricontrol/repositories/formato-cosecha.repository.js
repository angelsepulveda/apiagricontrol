const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const FormatoCosecha = require('../models/formato-cosecha.model');
const CampoFormatoCosecha = require('../models/campo-formato-cosecha.model');

const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { loggerError } = require('../../shared/helpers/logger.helper');

class FormatoCosechaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }
  async findAll() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db
        .sequelize()
        .query(
          'SELECT fc.CodFormatoCosecha as codFormatoCosecha, fc.Descripcion as descripcion,' +
            'fc.PesoMinimo as pesoMinimo, fc.PesoMaximo as pesoMaximo, fc.ValidarPeso as validarPeso,' +
            'fc.CodTipoRecoleccion as codTipoRecoleccion, fc.CodUnidadMedida as codUnidadMedida, um.UnidadMedida as unidadMedidad,' +
            'fc.ValorPromedio as valorPromedio, fc.UnidadesAPesar as unidadesAPesar, fc.CodEspecie as codEspecie, es.Especie as especie,' +
            'fc.CodCalidad as codCalidad, cd.Calidad as calidad, fc.CodUserUpdate as codUserUpdate, fc.FechaCreacion as fechaCreacion,' +
            'fc.FechaActualizacion as fechaActualizacion, fc.CodEstado as codEstado, fc.Sincro as sincro, fc.LastModified as lastModified,' +
            'fc.CodEquipo as codEquipo, fc.ControlSincro as controlSincro ' +
            ' FROM ' +
            database +
            '.TB_COS_FormatoCosecha as fc ' +
            'LEFT JOIN ' +
            'appzonec_comun.TB_COS_UnidadMedida as um ON fc.CodUnidadMedida = um.UnidadMedida ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Especie as es ON fc.CodEspecie = es.Especie ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_Calidad as cd ON fc.CodCalidad = cd.Calidad WHERE fc.CodEstado = 1 OR fc.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodFormatoCosecha({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db
        .sequelize()
        .query(
          'SELECT fc.CodFormatoCosecha as codFormatoCosecha,  fc.Descripcion as descripcion,' +
            'fc.PesoMinimo as pesoMinimo, fc.PesoMaximo as pesoMaximo, fc.ValidarPeso as validarPeso,' +
            'fc.CodTipoRecoleccion as codTipoRecoleccion, fc.CodUnidadMedida as codUnidadMedida, um.UnidadMedida as unidadMedidad,' +
            'fc.ValorPromedio as valorPromedio, fc.UnidadesAPesar as unidadesAPesar, fc.CodEspecie as codEspecie, es.Especie as especie,' +
            'fc.CodCalidad as codCalidad, cd.Calidad as calidad, fc.CodUserUpdate as codUserUpdate, fc.FechaCreacion as fechaCreacion,' +
            'fc.FechaActualizacion as fechaActualizacion, fc.CodEstado as codEstado, fc.Sincro as sincro, fc.LastModified as lastModified,' +
            'fc.CodEquipo as codEquipo, fc.ControlSincro as controlSincro ' +
            ' FROM ' +
            database +
            '.TB_COS_FormatoCosecha as fc ' +
            'LEFT JOIN ' +
            'appzonec_comun.TB_COS_UnidadMedida as um ON fc.CodUnidadMedida = um.UnidadMedida ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Especie as es ON fc.CodEspecie = es.Especie ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_Calidad as cd ON fc.CodCalidad = cd.Calidad ' +
            'WHERE fc.CodFormatoCosecha = ' +
            cod +
            ' AND fc.CodEstado = 1 OR fc.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByFormatoCosechasCampos({ codFormatoCosecha, codProductor }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: codProductor });

      const sql = `SELECT f.CodFormatoCosecha as codFormatoCosecha, CONVERT(f.CodCampo, NCHAR) as codCampo, c.Campo as campo
                    FROM TB_COS_CampoFormatoCosecha as f left join TB_GRAL_Campo as c ON f.CodCampo = c.CodCampo
                    WHERE f.CodFormatoCosecha = ${codFormatoCosecha}`;
      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      loggerError('Error en formato cosecha', e);
    }
  }

  async formatoCosechasCamposAll({ codCampo }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT f.CodFormatoCosecha as codFormatoCosecha, CONVERT(f.CodCampo, NCHAR) as codCampo, c.Campo as campo,
                    fc.Descripcion as descripcion
                    FROM TB_COS_CampoFormatoCosecha as f left join TB_GRAL_Campo as c ON f.CodCampo = c.CodCampo
                    left join TB_COS_FormatoCosecha as fc on fc.CodFormatoCosecha = f.CodFormatoCosecha WHERE f.CodCampo = ${codCampo}
                    AND fc.CodEstado = 1 OR fc.CodEstado = 0`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      loggerError('Error en formato cosecha', e);
    }
  }

  async create({ data, campos }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const cod = this._cod;
      const lng = this._lng;
      await db.sequelize().transaction(async function (t) {
        let campoCreatedArray = [];
        const formatoCosecha = await FormatoCosecha(cod, lng).create(
          {
            ...data,
            fechaCreacion: new Date(),
            codFormatoCosecha: dateNumber(),
            codEstado: 1,
            codUserUpdate: 0,
            sincro: 0,
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        if (campos !== undefined) {
          for (let i = 0; i < campos.length; i++) {
            let campoCreated = {
              codCampo: campos[i],
              codFormatoCosecha: formatoCosecha.codFormatoCosecha,
              codEstado: formatoCosecha.codEstado,
              sincro: 0,
              lastModified: dateNumber(),
            };

            campoCreatedArray.push(campoCreated);
          }

          await CampoFormatoCosecha(cod, lng).bulkCreate(campoCreatedArray, { transaction: t });
        }

        return Promise.all(campoCreatedArray)
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

  async update({ cod, data, campos }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      const formatoCosecha = await FormatoCosecha(codProductor, lng).findByPk(cod);

      if (formatoCosecha === null) {
        await this.server.disconnect();
        throw new NotFoundException(this._lng('notFound'));
      }

      await db.sequelize().transaction(async function (t) {
        let campoCreatedArray = [];
        await formatoCosecha.update(
          {
            ...data,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        if (campos !== undefined) {
          await CampoFormatoCosecha(codProductor, lng).destroy(
            {
              where: {
                codFormatoCosecha: formatoCosecha.codFormatoCosecha,
              },
            },
            { transaction: t },
          );

          for (let i = 0; i < campos.length; i++) {
            let campoCreated = {
              codCampo: campos[i],
              codFormatoCosecha: formatoCosecha.codFormatoCosecha,
              codEstado: formatoCosecha.codEstado,
              sincro: 0,
              lastModified: dateNumber(),
            };
            campoCreatedArray.push(campoCreated);
          }

          await CampoFormatoCosecha(cod, lng).bulkCreate(campoCreatedArray, { transaction: t });
        }

        return Promise.all(campoCreatedArray)
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

  async delete({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      const formatoCosecha = await FormatoCosecha(codProductor, lng).findByPk(cod);

      if (formatoCosecha === null) {
        await this.server.disconnect();
        throw new NotFoundException(this._lng('notFound'));
      }

      await db.sequelize().transaction(async function (t) {
        let campoCreatedArray = [];
        await formatoCosecha.update(
          {
            codEstado: 2,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        const campoFormatoCosecha = await FormatoCosecha(codProductor, lng).update(
          {
            codEstado: formatoCosecha.codEstado,
            sincro: 0,
            lastModified: dateNumber(),
          },
          { where: { codFormatoCosecha: cod } },
          { transaction: t },
        );
        campoCreatedArray.push(campoFormatoCosecha);

        return Promise.all(campoCreatedArray)
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
module.exports = FormatoCosechaRepository;
