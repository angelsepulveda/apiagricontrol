const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Direccion = require('../models/direccion.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class DireccionRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const sql = `SELECT CONVERT(d.CodDireccion,NCHAR) AS codDireccion,
                d.CodEntidad ad codEntidad,d.CodTablaEntidad as codTablaEntidad,t.Tabla as tabla,d.Calle as calle,d.Numero as numero,
                d.Apartamento as apartamento,d.InformacionAdicional as informacionAdicional,d.CodigoPostal as codigoPostal,d.CodPais as codPais,p.Pais as pais,
                d.CodRegion as codRegion,r.Region as region,d.CodComuna as codComuna,
                c.Comuna as comuna,d.Ciudad as ciudad,d.Predeterminada as predeterminada ,d.CodUserUpdate as codUserUpdate,
                d.FechaCreacion as fechaCreacion,d.FechaActualizacion as fechaActualizacion ,d.CodEstado as codEstado,
                d.Sincro as sincro, ,d.LastModified as lastModified FROM TB_GRAL_Direccion as d
                LEFT JOIN TB_GRAL_Pais as p ON d.CodPais = p.CodPais
                LEFT JOIN TB_GRAL_Region as r ON d.CodRegion = r.CodRegion
                LEFT JOIN TB_GRAL_Comuna as c ON d.CodComuna = c.CodComuna
                LEFT JOIN TB_SIS_TablaEntidad as t ON d.CodTablaEntidad = t.CodTablaEntidad
                WHERE d.CodEstado = 1 OR d.CodEstado = 0`;
      const [results] = await db.sequelize().query(sql);
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodDireccion({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codEntidad = cod.toString();

      const sql = `SELECT CONVERT(d.CodDireccion,NCHAR) as codDireccion,
             d.Calle as calle,d.Numero as numero,d.Apartamento as apartamento,d.InformacionAdicional as informacionAdicional,
             d.CodigoPostal as codigoPostal ,d.CodPais as codPais ,p.Pais as pais ,d.CodRegion as codRegion ,r.Region as region,
             CONVERT(d.CodComuna,NCHAR) as codComuna,c.Comuna as comuna ,d.Ciudad as ciudad,
             d.Predeterminada as predeterminada,
             d.CodEstado as codEstado
             FROM TB_GRAL_Direccion as d
             LEFT JOIN TB_GRAL_Pais as p ON d.CodPais = p.CodPais
             LEFT JOIN TB_GRAL_Region as r ON d.CodRegion = r.CodRegion
             LEFT JOIN TB_GRAL_Comuna as c ON d.CodComuna = c.CodComuna
             LEFT JOIN TB_SIS_TablaEntidad as t ON d.CodTablaEntidad = t.CodTablaEntidad
             WHERE d.CodEntidad LIKE ${codEntidad} AND d.CodEstado = 1 OR d.CodEstado = 0`;

      const [results] = await db.sequelize().query(sql);
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Direccion(this._cod, this._lng).create({
        ...data,
        codDireccion: dateNumber(),
        codEstado: 1,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codDireccion, data }) {
    try {
      const direccion = await Direccion(this._cod, this._lng).findOne({ where: { codDireccion: codDireccion } });

      if (direccion === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await direccion.update({
        ...data,
        lastModified: dateNumber(),
      });
      return direccion;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = DireccionRepository;
