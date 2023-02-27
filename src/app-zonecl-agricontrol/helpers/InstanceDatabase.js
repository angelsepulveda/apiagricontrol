const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const AppZonecComunServer = require('../../shared/database/app-zonec-comun-server');

const instanceDataBase = codProductor => {
  return new AppZonecAgricontrolServer({
    appZoneAgriControlDB: AppZoneAgriControlDB,
    codProductor: codProductor,
  });
};

const instanceDataBaseComun = () => {
  return new AppZonecComunServer();
}

module.exports = { instanceDataBaseComun, instanceDataBase };
