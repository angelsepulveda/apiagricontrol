const { ProductorRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class ProductorService {
  constructor({ lng }) {
    this._repository = new ProductorRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodProductor({ cod }) {
    const productor = await this._repository.findByCodProductor({ cod: cod });

    if (productor === null) throw new NotFoundException(this._lng('notFound'));

    return productor;
  }
}
module.exports = ProductorService;
