const Server = require('./server');
const AppZonecComunDB = require('../database/connection/app-zonec-comun');
const AppZonecComunServer = require('../database/app-zonec-comun-server');
const { ProductorRepository } = require('./../../app-zonecl-comun/repositories');
const database = require('../../app-zonecl-agricontrol/helpers/InstanceDatabase');

class Startup {
  constructor() {
    this._server = new Server();
    this._databaseAppZonecComun = new AppZonecComunServer({
      AppZonecComunDB: AppZonecComunDB,
    });
    this._repository = new ProductorRepository();
  }

  async start() {
    await this._server.start();
    //conexion con la base de datos comun
    await this._databaseAppZonecComun.connect();

    //conexion con las distintas bases de datos productores
    const productores = await this._repository.findAll();

    for (const i in productores) {
      const productor = productores[i].codProductor.toString();
      const server = database.instanceDataBase(productor);
      await server.connect();
    }
  }
}

module.exports = Startup;
