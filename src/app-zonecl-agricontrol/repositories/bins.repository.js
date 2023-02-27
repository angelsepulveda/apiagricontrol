const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Bins = require('../models/bins.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { v4: uuid } = require('uuid');

class BinsRepository {
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
          'SELECT co.CodBins as codBins,co.CodGrupoBins as codGrupoBins,co.CodEquipoCaptura as codEquipoCaptura,co.FechaCaptura as fechaCaptura,' +
            'co.CodCampo as codCampo, ca.Campo as campo,co.CodSector as codSector,se.Sector as sector,' +
            'co.CodCuartel as codCuartel, cu.Cuartel as cuartel, co.CodVariedad as codVariedad, va.Variedad as variedad,' +
            'co.CodFormatoCosecha as codFormatoCosecha,fc.CodFormatoCosecha as codFormatoCosecha,co.Valor as valor,' +
            'co.NumeroGuia as numeroGuia, co.CodUserUpdate as codUserUpdate,' +
            'co.FechaCreacion as fechaCreacion, co.FechaActualizacion as fechaActualizacion, co.CodEstado as codEstado, co.Sincro as sincro,' +
            'co.LastModified as lastModified, co.CodEquipo as codEquipo, co.ControlSincro as controlSincro' +
            ' FROM TB_COS_BINS as co LEFT JOIN TB_GRAL_Campo as ca ON co.CodCampo = ca.Campo ' +
            'LEFT JOIN TB_GRAL_Sector as se ON co.CodSector = se.Sector ' +
            'LEFT JOIN  TB_GRAL_Cuartel as cu ON co.CodCuartel = cu.Cuartel ' +
            'LEFT JOIN  TB_GRAL_Variedad as va ON co.CodVariedad = va.Variedad ' +
            'LEFT JOIN TB_COS_FormatoCosecha as fc ON co.CodFormatoCosecha = fc.CodFormatoCosecha ' +
            'WHERE co.CodEstado = 1 OR co.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodBins({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT co.CodBins as codBins,co.CodGrupoBins as codGrupoBins,co.CodEquipoCaptura as codEquipoCaptura,co.FechaCaptura as fechaCaptura,' +
            'co.CodCampo as codCampo, ca.Campo as campo,co.CodSector as codSector,se.Sector as sector,' +
            'co.CodCuartel as codCuartel, cu.Cuartel as cuartel, co.CodVariedad as codVariedad, va.Variedad as variedad,' +
            'co.CodFormatoCosecha as codFormatoCosecha,fc.CodFormatoCosecha as codFormatoCosecha,co.Valor as valor,' +
            'co.NumeroGuia as numeroGuia, co.CodUserUpdate as codUserUpdate,' +
            'co.FechaCreacion as fechaCreacion, co.FechaActualizacion as fechaActualizacion, co.CodEstado as codEstado, co.Sincro as sincro,' +
            'co.LastModified as lastModified, co.CodEquipo as codEquipo, co.ControlSincro as controlSincro' +
            ' FROM TB_COS_BINS as co LEFT JOIN TB_GRAL_Campo as ca ON co.CodCampo = ca.Campo ' +
            'LEFT JOIN TB_GRAL_Sector as se ON co.CodSector = se.Sector ' +
            'LEFT JOIN  TB_GRAL_Cuartel as cu ON co.CodCuartel = cu.Cuartel ' +
            'LEFT JOIN  TB_GRAL_Variedad as va ON co.CodVariedad = va.Variedad ' +
            'LEFT JOIN TB_COS_FormatoCosecha as fc ON co.CodFormatoCosecha = fc.CodFormatoCosecha ' +
            'WHERE co.CodBins = ' +
            cod +
            ' AND co.CodEstado = 1 OR co.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }
  async create(data) {
    try {
      return await Bins(this._cod, this._lng).create({
        ...data,
        codBins: uuid(),
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
      const bins = await Bins(this._cod, this._lng).findByPk(cod);

      if (bins === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await bins.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });

      return bins;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = BinsRepository;
