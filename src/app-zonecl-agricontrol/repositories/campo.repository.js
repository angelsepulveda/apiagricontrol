const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Campo = require('../models/campo.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class CampoRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }
  async findAll() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(c.CodCampo,NCHAR) as codCampo, c.NemoTecnico as nemoTecnico, c.NombreCorto as nombreCorto, c.Campo as campo, c.Latitud as latitud,
          c.Longitud as longitud, c.CodEmpresa as codEmpresa, e.CodEmpresa as codEmpresa,c.CodCalendario as codCalendario, ca.CodCalendario as codCalendario,
          c.Poligono as poligono, c.NombreCortoPoligono as nombreCortoPoligono, c.NombrePoligono as nombrePoligono,
          c.FechaCreacion as fechaCreacion, c.FechaActualizacion as fechaActualizacion, c.CodEstado as codEstado
           FROM TB_GRAL_Campo as c LEFT JOIN TB_GRAL_Empresa as e ON c.CodEmpresa = e.CodEmpresa
          LEFT JOIN TB_GRAL_Calendario as ca ON c.CodCalendario = ca.CodCalendario
          WHERE c.CodEstado = 1 OR c.CodEstado = 0`,
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
        `SELECT CONVERT(c.CodCampo,NCHAR) as codCampo, c.Campo as campo
           FROM TB_GRAL_Campo as c LEFT JOIN TB_GRAL_Empresa as e ON c.CodEmpresa = e.CodEmpresa
          LEFT JOIN TB_GRAL_Calendario as ca ON c.CodCalendario = ca.CodCalendario
          WHERE c.CodEstado = 1 OR c.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCampo({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(c.CodCampo,NCHAR) as codCampo, c.NemoTecnico as nemoTecnico, c.NombreCorto as nombreCorto, c.Campo as campo, c.Latitud as latitud,
        c.Longitud as longitud, c.CodEmpresa as codEmpresa, e.CodEmpresa as codEmpresa,c.CodCalendario as codCalendario, ca.CodCalendario as codCalendario,
        c.Poligono as poligono, c.NombreCortoPoligono as nombreCortoPoligono, c.NombrePoligono as nombrePoligono, c.CodUserUpdate as codUserUpdate,
        c.FechaCreacion as fechaCreacion, c.FechaActualizacion as fechaActualizacion, c.CodEstado as codEstado
         FROM TB_GRAL_Campo as c LEFT JOIN TB_GRAL_Empresa as e ON c.CodEmpresa = e.CodEmpresa
        LEFT JOIN TB_GRAL_Calendario as ca ON c.CodCalendario = ca.CodCalendario
        WHERE c.CodCampo =  ${cod} AND c.CodEstado = 1 OR c.CodEstado = 0`,
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
        `SELECT CONVERT(c.CodCampo,NCHAR) as codCampo,c.Campo as campo
           FROM TB_GRAL_Campo as c LEFT JOIN TB_GRAL_Empresa as e ON c.CodEmpresa = e.CodEmpresa
          LEFT JOIN TB_GRAL_Calendario as ca ON c.CodCalendario = ca.CodCalendario
          WHERE ${whereCampos} and c.CodEstado = 1 OR c.CodEstado = 0`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Campo(this._cod, this._lng).create({
        ...data,
        codCampo: dateNumber(),
        codUserUpdate: 0,
        sincro: 0,
        poligono: null,
        fechaCreacion: new Date(),
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
  async update({ codCampo, data }) {
    try {
      const campo = await Campo(this._cod, this._lng).findByPk(codCampo);

      if (campo === null) {
        throw new NotFoundException(this._lng('notFound'));
      }
      await campo.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });

      return campo;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = CampoRepository;
