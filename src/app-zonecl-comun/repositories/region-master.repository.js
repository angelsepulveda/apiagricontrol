const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

class RegionMasterRepository {
  constructor() {}
  async findAll() {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT rm.CodRegion as codRegion, rm.CodPais as codPais, ps.CodPais as codPais, rm.NemoTecnico as nemoTecnico,' +
            'rm.Region as region, rm.CodEstado as codEstado, rm.Sincro as sincro, rm.LastModified as lastModified, rm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_RegionMaster as rm LEFT JOIN TB_GRAL_PaisMaster as ps ON rm.CodPais = ps.CodPais ' +
            'WHERE rm.CodEstado = 1 OR rm.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT rm.CodRegion as codRegion, rm.Region as region FROM TB_GRAL_RegionMaster as rm WHERE rm.CodEstado = 1 OR rm.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodRegion({ cod }) {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT rm.CodRegion as codRegion, rm.CodPais as codPais, ps.CodPais as codPais, rm.NemoTecnico as nemoTecnico,' +
            'rm.Region as region, rm.CodEstado as codEstado, rm.Sincro as sincro, rm.LastModified as lastModified, rm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_RegionMaster as rm LEFT JOIN TB_GRAL_PaisMaster as ps ON rm.CodPais = ps.CodPais ' +
            'WHERE rm.CodRegion = ' +
            cod +
            ' AND rm.CodEstado = 1 OR rm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodPais({ cod }) {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT rm.CodRegion as codRegion, rm.CodPais as codPais, ps.CodPais as codPais, rm.NemoTecnico as nemoTecnico,' +
            'rm.Region as region, rm.CodEstado as codEstado, rm.Sincro as sincro, rm.LastModified as lastModified, rm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_RegionMaster as rm LEFT JOIN TB_GRAL_PaisMaster as ps ON rm.CodPais = ps.CodPais ' +
            'WHERE rm.CodPais = ' +
            cod +
            ' AND rm.CodEstado = 1 OR rm.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = RegionMasterRepository;
