const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Variedad = require('../models/variedad.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class VariedadRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT v.CodVariedad as codVariedad, v.CodEspecie as codEspecie,e.Especie as especie,v.Variedad as variedad,v.NombreCorto as nombreCorto,
            v.NemoTecnico as nemoTecnico, v.CodUserUpdate as codUserUpdate, v.FechaActualizacion as fechaActualizacion,
            v.FechaCreacion as fechaCreacion ,v.CodEstado as codEstado FROM TB_GRAL_Variedad as v LEFT JOIN TB_GRAL_Especie as e ON v.CodEspecie = e.CodEspecie
            WHERE v.CodEstado = 1 OR v.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT v.CodVariedad as codVariedad, v.Variedad as variedad FROM TB_GRAL_Variedad as v LEFT JOIN TB_GRAL_Especie as e ON v.CodEspecie = e.CodEspecie
            WHERE v.CodEstado = 1 OR v.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodVariedad({ cod }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT v.CodVariedad as codVariedad, v.CodEspecie as codEspecie,e.Especie as especie,v.Variedad as variedad,v.NombreCorto as nombreCorto,
            v.NemoTecnico as nemoTecnico,v.CodUserUpdate as codUserUpdate, v.FechaActualizacion as fechaActualizacion,
            v.FechaCreacion as fechaCreacion ,v.CodEstado as codEstado
            FROM TB_GRAL_Variedad as v LEFT JOIN TB_GRAL_Especie as e ON v.CodEspecie = e.CodEspecie
            WHERE v.CodVariedad =
            ${cod}`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodEspecie({ cod }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT v.CodVariedad as codVariedad, v.CodEspecie as codEspecie,e.Especie as especie,v.Variedad as variedad,v.NombreCorto as nombreCorto,
            v.NemoTecnico as nemoTecnico FROM TB_GRAL_Variedad as v LEFT JOIN TB_GRAL_Especie as e ON v.CodEspecie = e.CodEspecie
            WHERE v.CodVariedad =
            ${cod}
            AND v.CodEstado = 1 OR v.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Variedad(this._cod, this._lng).create({
        ...data,
        codEstado: 1,
        codUserUpdate: 2,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ cod, data }) {
    try {
      const variedad = await Variedad(this._cod, this._lng).findByPk(cod);

      if (variedad === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await variedad.update({
        ...data,
        codUserUpdate: 2,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = VariedadRepository;
