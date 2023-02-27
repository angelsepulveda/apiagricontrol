const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

class ComunaMasterRepository {
  constructor() {}
  async findAll() {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT cm.CodComuna as codComuna, cm.CodRegion as codRegion, re.CodRegion as codRegion, cm.NemoTecnico as nemoTecnico,' +
            'cm.Comuna as comuna, cm.CodEstado as codEstado, cm.Sincro as sincro, cm.LastModified as lastModified, cm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_ComunaMaster as cm LEFT JOIN TB_GRAL_RegionMaster as re ON cm.CodRegion = re.CodRegion ' +
            'WHERE cm.CodEstado = 1 OR cm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodComuna({ cod }) {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT cm.CodComuna as codComuna, cm.CodRegion as codRegion, re.CodRegion as codRegion, cm.NemoTecnico as nemoTecnico,' +
            'cm.Comuna as comuna, cm.CodEstado as codEstado, cm.Sincro as sincro, cm.LastModified as lastModified, cm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_ComunaMaster as cm LEFT JOIN TB_GRAL_RegionMaster as re ON cm.CodRegion = re.CodRegion ' +
            'WHERE cm.CodComuna = ' +
            cod +
            ' AND cm.CodEstado = 1 OR cm.CodEstado = 0',
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
          'SELECT cm.CodComuna as codComuna, cm.CodRegion as codRegion, re.CodRegion as codRegion, cm.NemoTecnico as nemoTecnico,' +
            'cm.Comuna as comuna, cm.CodEstado as codEstado, cm.Sincro as sincro, cm.LastModified as lastModified, cm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_ComunaMaster as cm LEFT JOIN TB_GRAL_RegionMaster as re ON cm.CodRegion = re.CodRegion ' +
            'WHERE cm.CodRegion = ' +
            cod +
            ' AND cm.CodEstado = 1 OR cm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = ComunaMasterRepository;
