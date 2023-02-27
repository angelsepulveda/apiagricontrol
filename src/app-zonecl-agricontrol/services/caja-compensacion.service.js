const { CajaCompensacionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class CajaCompensacionService {
  constructor({ codProductor, lng }) {
    this._repository = new CajaCompensacionRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodCajaCompensacion({ cod }) {
    const cajaCompensacion = await this._repository.findByCodCajaCompensacion({ cod: cod });

    if (cajaCompensacion === null) throw new NotFoundException(this._lng('notFound'));

    return cajaCompensacion;
  }
}

module.exports = CajaCompensacionService;
