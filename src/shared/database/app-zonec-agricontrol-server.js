const { loggerInfo, loggerError } = require('../helpers/logger.helper');

class AppZonecAgricontrolServer {
  constructor({ appZoneAgriControlDB, codProductor }) {
    //especificacion del codigo del productor para la base de datos
    this._db = new appZoneAgriControlDB({ codProductor: codProductor });
    this._productor = codProductor;
  }

  /*
   * Conexion a la base de datos del productor espeficicado
   */
  async connect() {
    try {
      await this._db.sequelize().authenticate();
      loggerInfo('Conexion exitosa con App Zone Agri Control del productor ' + this._productor);
    } catch (e) {
      loggerError('Error en la conexion base de datos productor', e);
      throw e;
    }
  }

  /**
   * CIERRE DE CONEXION A LA BASE DE DATOS
   */
  async disconnect() {
    try {
      await this._db.sequelize().close();
      loggerInfo('Conexion cerrada con App Zone Agri Control');
    } catch (e) {
      throw e;
    }
  }
}

module.exports = AppZonecAgricontrolServer;
