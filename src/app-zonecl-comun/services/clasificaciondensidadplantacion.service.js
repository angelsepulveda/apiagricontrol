const { ClasificacionDensidadPlantacionRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class ClasificacionDensidadPlantacionService {
  constructor({ lng }) {
    this._repository = new ClasificacionDensidadPlantacionRepository();
    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodClasificacionDensidad({ cod }) {
    const clasificacion = await this._repository.findByCodClasificacionDensidad({ cod: cod });

    if (clasificacion === null) throw new NotFoundException(this._lng('notFound'));
    return clasificacion;
  }
}
module.exports = ClasificacionDensidadPlantacionService;
