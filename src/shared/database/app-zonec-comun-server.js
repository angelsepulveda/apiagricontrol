const AppZoneComunDB = require('./connection/app-zonec-comun');
const { DatabaseException } = require('../exceptions');
const { loggerInfo } = require('../helpers/logger.helper');

class AppZonecComunServer {
  constructor() {
    this.db = new AppZoneComunDB();
  }

  /**
   * INICIO DE CONEXION A LA BASE DE DATOS
   */
  async connect() {
    try {
      await this.db.sequelize().authenticate();
      loggerInfo('Conexion exitosa con App Zone Comun');
    } catch (e) {
      throw new DatabaseException(e.message, 500);
    }
  }

  /**
   * CIERRE DE CONEXION A LA BASE DE DATOS
   */
  async disconnect() {
    try {
      await this.db.sequelize().close();
      oggerInfo('Conexion cerrada con App Zone Comun');
    } catch (e) {
      throw new DatabaseException(e.message, 500);
    }
  }

  sequelize() {
    return this.db.sequelize();
  }
}

module.exports = AppZonecComunServer;
