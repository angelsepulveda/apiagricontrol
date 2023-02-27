const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Comuna = require('../models/comuna.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class ComunaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT CONVERT(c.CodComuna, NCHAR) as codComuna,c.CodRegion as codRegion, r.Region as region, c.NemoTecnico as nemoTecnico, c.Comuna as comuna,' +
            'c.CodEstado as codEstado, c.Sincro as sincro, c.LastModified as lastModified,c.CodEquipo as codEquipo, c.ControlSincro as controlSincro' +
            ' FROM TB_GRAL_Comuna as c LEFT JOIN TB_GRAL_Region as r ON c.CodRegion = r.Region ' +
            'WHERE c.CodEstado = 1 OR c.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT CONVERT(c.CodComuna, NCHAR) as codComuna, c.Comuna as comuna' +
            ' FROM TB_GRAL_Comuna as c LEFT JOIN TB_GRAL_Region as r ON c.CodRegion = r.Region ' +
            'WHERE c.CodEstado = 1 OR c.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodComuna({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT CONVERT(c.CodComuna,NCHAR) as codComuna, c.CodRegion as codRegion, r.Region as region, c.NemoTecnico as nemoTecnico, c.Comuna as comuna,' +
            'c.CodEstado as codEstado, c.Sincro as sincro, c.LastModified as lastModified,c.CodEquipo as codEquipo, c.ControlSincro as controlSincro' +
            ' FROM TB_GRAL_Comuna as c LEFT JOIN TB_GRAL_Region as r ON c.CodRegion = r.Region ' +
            'WHERE c.CodComuna = ' +
            cod +
            ' AND c.CodEstado = 1 OR c.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      const codComuna = data.codComuna;
      const comuna = await Comuna(this._cod, this._lng).findByPk(codComuna, {
        attributes: ['codComuna', 'codEstado'],
      });

      if (comuna !== null) {
        if (comuna.codEstado !== 1) {
          const comunaUpdate = await comuna.update({
            codEstado: 1,
            lastModified: dateNumber(),
          });

          return comunaUpdate;
        } else {
          throw new NotFoundException(this._lng('exits'));
        }
      }

      const comunaCreated = await Comuna(this._cod, this._lng).create({
        ...data,
        lastModified: dateNumber(),
      });

      return comunaCreated;
    } catch (e) {
      throw e;
    }
  }

  async delete({ cod }) {
    try {
      const comuna = await Comuna(this._cod, this._lng).findByPk(cod);

      if (comuna === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await comuna.update({
        codEstado: 2,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ComunaRepository;
