const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

class VariedadMasterRepository {
  constructor() {}
  async findAll() {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT vm.CodVariedad as codVariedad, vm.CodEspecie as codEspecie, ep.CodEspecie as codEspecie, vm.NemoTecnico as nemoTecnico,' +
            'vm.Variedad as variedad, vm.NombreCorto as nombreCorto, vm.CodEstado as codEstado, vm.Sincro as sincro, vm.LastModified as lastModified,' +
            'vm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_VariedadMaster as vm LEFT JOIN TB_GRAL_EspecieMaster as ep ON vm.CodEspecie = ep.CodEspecie ' +
            'WHERE vm.CodEstado = 1 OR vm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
  async findByCodVariedad({ cod }) {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT vm.CodVariedad as codVariedad, vm.CodEspecie as codEspecie, ep.CodEspecie as codEspecie, vm.NemoTecnico as nemoTecnico,' +
            'vm.Variedad as variedad, vm.NombreCorto as nombreCorto, vm.CodEstado as codEstado, vm.Sincro as sincro, vm.LastModified as lastModified,' +
            'vm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_VariedadMaster as vm LEFT JOIN TB_GRAL_EspecieMaster as ep ON vm.CodEspecie = ep.CodEspecie ' +
            'WHERE vm.CodVariedad = ' +
            cod +
            ' AND vm.CodEstado = 1 OR vm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodEspecie({ cod }) {
    try {
      const db = new AppZonecComunDB();
      const [results] = await db
        .sequelize()
        .query(
          'SELECT vm.CodVariedad as codVariedad, vm.CodEspecie as codEspecie, ep.CodEspecie as codEspecie, vm.NemoTecnico as nemoTecnico,' +
            'vm.Variedad as variedad, vm.NombreCorto as nombreCorto, vm.CodEstado as codEstado, vm.Sincro as sincro, vm.LastModified as lastModified,' +
            'vm.CodEquipo as codEquipo' +
            ' FROM TB_GRAL_VariedadMaster as vm LEFT JOIN TB_GRAL_EspecieMaster as ep ON vm.CodEspecie = ep.CodEspecie ' +
            'WHERE vm.CodEspecie = ' +
            cod +
            ' AND vm.CodEstado = 1 OR vm.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = VariedadMasterRepository;
