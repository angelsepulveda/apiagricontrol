const { DB_AGRI_CONTROL } = require('../../config/environments');
const { Sequelize } = require('sequelize');
const config = DB_AGRI_CONTROL;
const host = DB_AGRI_CONTROL.host;
const port = DB_AGRI_CONTROL.port;

class AppAgriControlDB {
  constructor({ codProductor }) {
    const numero = codProductor.padStart(4, '0');
    this._sequelize = new Sequelize(config.database + numero, config.username, config.password, {
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

module.exports = AppAgriControlDB;
