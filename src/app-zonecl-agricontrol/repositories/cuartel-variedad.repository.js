const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

class CuartelVariedadRepository {
  constructor({ codProductor }) {
    this._cod = codProductor;
  }

  async findAll() {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT va.CodVariedad as codVariedad,v.variedad as variedad ,va.CodCampo as codCampo ,ca.Campo as campo, va.CodSector as codSector,' +
            'sec.Sector as sector, va.CodCuartel as codCuartel, cu.Cuartel as cuartel, va.HaProductivasVar as haProductivasVar, va.NumPlantas as numPlantas, va.NumHileras as numHileras,' +
            'va.DiaFrecuenciaMin as diaFrecuenciaMin, va.DiaFrecuenciaMax as diaFrecuenciaMax, va.FinalizaCosecha as finalizaCosecha, va.CodUserUpdate as codUserUpdate, ' +
            'va.FechaCreacion as fechaCreacion, va.FechaActualizacion as fechaActualizacion,va.CodEstado as codEstado, va.Sincro as sincro,va.LastModified as lastModified,' +
            'va.CodEquipo as codEquipo, va.ControlSincro as controlSincro ' +
            'FROM TB_GRAL_CuartelVariedad as va LEFT JOIN TB_GRAL_Cuartel as cu ON va.CodCuartel = cu.CodCuartel ' +
            'LEFT JOIN TB_GRAL_Campo as ca ON va.CodCampo = ca.CodCampo LEFT JOIN TB_GRAL_Sector as sec ON va.CodSector = sec.CodSector ' +
            'LEFT JOIN TB_GRAL_Variedad as v ON va.CodVariedad = v.CodVariedad WHERE va.CodEstado = 1 OR va.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCuartel({ codCuartel }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });
      const [results] = await db
        .sequelize()
        .query(
          'SELECT va.CodVariedad as codVariedad,v.variedad as variedad ,va.CodCampo as codCampo ,ca.Campo as campo, va.CodSector as codSector,' +
            'sec.Sector as sector,va.NemoTecnico as nemoTecnico,va.CodCuartel as codCuartel, cu.Cuartel as cuartel, va.HaProductivasVar as haProductivasVar, va.NumPlantas as numPlantas, va.NumHileras as numHileras,' +
            'va.DiaFrecuenciaMin as diaFrecuenciaMin, va.DiaFrecuenciaMax as diaFrecuenciaMax, va.FinalizaCosecha as finalizaCosecha,' +
            'va.CodEquipo as codEquipo, va.ControlSincro as controlSincro ' +
            'FROM TB_GRAL_CuartelVariedad as va LEFT JOIN TB_GRAL_Cuartel as cu ON va.CodCuartel = cu.CodCuartel ' +
            'LEFT JOIN TB_GRAL_Campo as ca ON va.CodCampo = ca.CodCampo LEFT JOIN TB_GRAL_Sector as sec ON va.CodSector = sec.CodSector ' +
            'LEFT JOIN TB_GRAL_Variedad as v ON va.CodVariedad = v.CodVariedad  WHERE va.CodCuartel = ' +
            codCuartel +
            ' AND va.CodEstado = 1 or va.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCuartelSelect({ codCuartel }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });
      const [results] = await db
        .sequelize()
        .query(
          'SELECT va.CodVariedad as codVariedad,v.variedad as variedad,v.codEspecie ' +
            'FROM TB_GRAL_CuartelVariedad as va ' +
            'LEFT JOIN TB_GRAL_Variedad as v ON va.CodVariedad = v.CodVariedad WHERE va.CodCuartel = ' +
            codCuartel +
            ' AND va.CodEstado = 1 or va.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CuartelVariedadRepository;
