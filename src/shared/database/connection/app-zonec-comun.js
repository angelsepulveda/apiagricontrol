const { DB_APP_ZONE_COMUN } = require('../../config/environments');
const { Sequelize } = require('sequelize');
const config = DB_APP_ZONE_COMUN;
const host = config.host;
const port = config.port;

class AppZonecComunDB {
  constructor() {
    this._sequelize = this.initialize();
  }

  initialize() {
    return new Sequelize(config.database, config.username, config.password, {
      host,
      dialect: 'mysql',
      port: port,
      logging: false,
    });
  }

  sequelize() {
    return this._sequelize;
  }
}

module.exports = AppZonecComunDB;
