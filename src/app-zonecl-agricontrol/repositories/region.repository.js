const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Region = require('../models/region.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class RegionRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT r.CodRegion as codRegion, r.CodPais as codPais, p.Pais as pais, r.NemoTecnico as nemoTecnico, r.Region as region,
            r.CodEstado as codEstado FROM TB_GRAL_Region as r LEFT JOIN TB_GRAL_Pais as p ON r.CodPais = p.CodPais
            WHERE r.CodEstado = 1 OR r.CodEstado = 0`,
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
        `SELECT r.CodRegion as codRegion, r.Region as region,r.CodPais as codPais,
            r.CodEstado as codEstado FROM TB_GRAL_Region as r LEFT JOIN TB_GRAL_Pais as p ON r.CodPais = p.CodPais
            WHERE r.CodEstado = 1 OR r.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodRegion({ cod }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT r.CodRegion as codRegion, r.CodPais as codPais, p.Pais as pais, r.NemoTecnico as nemoTecnico, r.Region as region,
            r.CodEstado as codEstado FROM TB_GRAL_Region as r LEFT JOIN TB_GRAL_Pais as p ON r.CodPais = p.CodPais
            WHERE r.CodRegion = ${cod} AND r.CodEstado = 1 OR r.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      const codRegion = data.codRegion;
      const region = await Region(this._cod, this._lng).findByPk(codRegion, {
        attributes: ['codRegion', 'codEstado'],
      });

      if (region !== null) {
        if (region.codEstado !== 1) {
          return await region.update({
            codEstado: 1,
            lastModified: dateNumber(),
          });
        } else {
          throw new NotFoundException(this._lng('exits'));
        }
      }

      return await Region(this._cod, this._lng).create({
        ...data,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async delete({ cod }) {
    try {
      const region = await Region(this._cod, this._lng).findByPk(cod);

      if (region === null) {
        throw new NotFoundException(this._lng('exits'));
      }

      await region.update({
        codEstado: 2,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = RegionRepository;
