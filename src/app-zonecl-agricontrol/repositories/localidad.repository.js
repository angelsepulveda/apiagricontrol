const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Localidad = require('../models/localidad.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class LocalidadRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT CONVERT(codLocalidad,NCHAR) as codLocalidad, CONVERT(l.CodComuna, NCHAR) as codComuna,
                  c.Comuna as comuna, l.Localidad as localidad,l.CodEstado as codEstado
                  FROM TB_GRAL_Localidad as l LEFT JOIN TB_GRAL_Comuna as c ON l.CodComuna = c.CodComuna
                 WHERE l.CodEstado = 1 OR l.CodEstado = 0`;
      const [results] = await db.sequelize().query(sql);
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodLocalidad({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT CONVERT(codLocalidad,NCHAR) as codLocalidad, CONVERT(l.CodComuna, NCHAR) as codComuna, c.Comuna as comuna,
                    l.Localidad as localidad,l.CodEstado as codEstado, l.Sincro as sincro, l.LastModified as lastModified,
                    l.CodEquipo as codEquipo, l.ControlSincro as controlSincro
                    FROM TB_GRAL_Localidad as l LEFT JOIN TB_GRAL_Comuna as c ON l.CodComuna = c.CodComuna
                     WHERE l.CodLocalidad = ${cod} AND l.CodEstado = 1 OR l.CodEstado = 0`;

      const [results] = await db.sequelize().query(sql);
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Localidad(this._cod, this._lng).create({
        ...data,
        codLocalidad: dateNumber(),
        sincro: 0,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codLocalidad, data }) {
    try {
      const localidad = await Localidad(this._cod, this._lng).findByPk(codLocalidad);

      if (localidad === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await localidad.update({
        ...data,
        lastModified: dateNumber(),
      });

      return localidad;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = LocalidadRepository;
