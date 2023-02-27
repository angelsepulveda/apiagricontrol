const { SaludRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class SaludService {
  constructor({ codProductor, lng }) {
    this._repository = new SaludRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodSalud({ cod }) {
    const salud = await this._repository.findByCodSalud({ cod: cod });

    if (salud === null) throw new NotFoundException(this._lng('nofound'));

    return salud;
  }
}

module.exports = SaludService;
