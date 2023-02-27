const { TableEntidadRepository } = require('../repositories');

class TablaEntidadService {
  constructor({ codProductor, lng }) {
    this._repository = new TableEntidadRepository({ codProductor: codProductor, lng: lng });
  }

  async findAll() {
    return this._repository.findAll();
  }
}

module.exports = TablaEntidadService;
