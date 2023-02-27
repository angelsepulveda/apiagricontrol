const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const Trato = require('../models/trato.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class TratoRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
    this.server = new AppZonecAgricontrolServer({
      appZoneAgriControlDB: AppZoneAgriControlDB,
      codProductor: this._cod,
    });
  }
  async findAll() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT t.CodTrato as codTrato, t.CodCampo as codCampo, ca.Campo as campo, t.CodFormatoCosecha as codFormatoCosecha, fc.CodFormatoCosecha as codFormatoCosecha,' +
            't.trato as trato, t.CodUserUpdate as codUserUpdate, t.FechaCreacion as fechaCreacion,' +
            't.FechaActualizacion as fechaActualizacion, t.CodEstado as codEstado, t.Sincro as sincro, t.LastModified as lastModified, t.CodEquipo as codEquipo, t.ControlSincro as controlSincro ' +
            ' FROM TB_COS_Trato as t LEFT JOIN TB_GRAL_Campo as ca ON t.CodCampo = ca.Campo ' +
            'LEFT JOIN TB_COS_FormatoCosecha as fc ON t.CodFormatoCosecha = fc.CodFormatoCosecha ' +
            'WHERE t.CodEstado = 1 OR t.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodTrato({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT t.CodTrato as codTrato, t.CodCampo as codCampo, ca.Campo as campo, t.CodFormatoCosecha as codFormatoCosecha, fc.CodFormatoCosecha as codFormatoCosecha,' +
            't.trato as trato, t.CodUserUpdate as codUserUpdate, t.FechaCreacion as fechaCreacion,' +
            't.FechaActualizacion as fechaActualizacion, t.CodEstado as codEstado, t.Sincro as sincro, t.LastModified as lastModified, t.CodEquipo as codEquipo, t.ControlSincro as controlSincro ' +
            ' FROM TB_COS_Trato as t LEFT JOIN TB_GRAL_Campo as ca ON t.CodCampo = ca.Campo ' +
            'LEFT JOIN TB_COS_FormatoCosecha as fc ON t.CodFormatoCosecha = fc.CodFormatoCosecha ' +
            'WHERE t.CodTrato = ' +
            cod +
            ' AND t.CodEstado = 1 OR t.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }
  async create(data) {
    try {
      return await Trato(this._cod, this._lng).create({
        ...data,
        codTrato: dateNumber(),
        codUserUpdate: 2,
        sincro: 0,
        fechaCreacion: new Date(),
        codEstado: 1,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
  async update({ cod, data }) {
    try {
      const trato = await Trato(this._cod, this._lng).findByPk(cod);

      if (trato === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      return await trato.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = TratoRepository;
