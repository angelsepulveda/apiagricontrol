const { CuartelVariedadRepository } = require('../repositories');

class CuartelVariedadService {
  constructor({ codProductor }) {
    this._repository = new CuartelVariedadRepository({ codProductor: codProductor });
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodCuartel({ codCuartel }) {
    return await this._repository.findByCodCuartel({
      codCuartel: codCuartel,
    });
  }

  async findByCodCuartelSelect({ codCuartel }) {
    return await this._repository.findByCodCuartelSelect({
      codCuartel: codCuartel,
    });
  }
}

module.exports = CuartelVariedadService;
