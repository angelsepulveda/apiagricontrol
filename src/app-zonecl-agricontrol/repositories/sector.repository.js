const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Sector = require('../models/sector.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class SectorRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(s.CodSector,NCHAR) as codSector,CONVERT(c.CodCampo,NCHAR) as codCampo,c.Campo as campo,s.NemoTecnico as nemoTecnico,s.NombreCorto as nombreCorto,
            s.Sector as sector,s.Poligono as poligono,s.NombreCortoPoligono as nombreCortoPoligono,s.NombrePoligono as nombrePoligono,
            s.FechaCreacion as fechaCreacion,s.FechaActualizacion as fechaActualizacion,
            s.CodEstado as codEstado FROM TB_GRAL_Sector as s
            LEFT JOIN TB_GRAL_Campo as c ON s.CodCampo = c.CodCampo WHERE s.CodEstado = 1 OR s.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(s.CodSector,NCHAR) as codSector, s.Sector as sector FROM TB_GRAL_Sector as s
            LEFT JOIN TB_GRAL_Campo as c ON s.CodCampo = c.CodCampo WHERE s.CodEstado = 1 OR s.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodSector({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(s.CodSector,NCHAR) as codSector,CONVERT(c.CodCampo,NCHAR) as codCampo,c.Campo as campo,s.NemoTecnico as nemoTecnico,s.NombreCorto as nombreCorto,
            s.Sector as sector,s.Poligono as poligono,s.NombreCortoPoligono as nombreCortoPoligono,s.NombrePoligono as nombrePoligono,
            s.FechaCreacion as fechaCreacion,s.FechaActualizacion as fechaActualizacion,
            s.CodEstado as codEstado FROM TB_GRAL_Sector as s
            LEFT JOIN TB_GRAL_Campo as c ON s.CodCampo = c.CodCampo
            WHERE s.CodSector =
            ${cod}
            AND s.CodEstado = 1 OR s.CodEstado = 0`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findAllCodCampo({ codCampos }) {
    try {
      let whereCampos = ' ';

      codCampos.forEach(campo => (whereCampos = whereCampos + `s.CodCampo = ${campo.codCampo} or `));

      whereCampos = whereCampos.substring(0, whereCampos.length - 3);

      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(s.CodSector,NCHAR) as codSector, s.Sector as sector FROM TB_GRAL_Sector as s
            LEFT JOIN TB_GRAL_Campo as c ON s.CodCampo = c.CodCampo WHERE (${whereCampos}) and ( s.CodEstado = 1 OR s.CodEstado = 0)`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCampo({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(s.CodSector,NCHAR) as codSector,CONVERT(c.CodCampo,NCHAR) as codCampo,c.Campo as campo,s.NemoTecnico as nemoTecnico,s.NombreCorto as nombreCorto,
        s.Sector as sector,s.Poligono as poligono,s.NombreCortoPoligono as nombreCortoPoligono,s.NombrePoligono as nombrePoligono FROM TB_GRAL_Sector as s
        LEFT JOIN TB_GRAL_Campo as c ON s.CodCampo = c.CodCampo
        WHERE s.codCampo =  ${cod} AND s.CodEstado != 2`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Sector(this._cod, this._lng).create({
        ...data,
        codSector: dateNumber(),
        fechaCreacion: new Date(),
        codUserUpdate: 0,
        sincro: 0,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codSector, data }) {
    try {
      const sector = await Sector(this._cod, this._lng).findOne({
        where: { codSector: codSector },
      });

      if (sector === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await sector.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });
      return sector;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SectorRepository;
