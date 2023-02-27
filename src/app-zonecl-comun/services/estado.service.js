const { EstadoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class EstadoService {
  constructor({ lng }) {
    this._repository = new EstadoRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodEstado({ cod }) {
    const estado = await this._repository.findByCodEstado({ cod: cod });

    if (estado === null) throw new NotFoundException(this._lng('notFound'));

    return estado;
  }
}
module.exports = EstadoService;
