const { EquipoRepository, CuadrillaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class EquipoService {
  constructor({ codProductor, lng }) {
    this._codProductor = codProductor;
    this._repository = new EquipoRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodEquipoJefe({ cod }) {
    return await this._repository.findByCodEquipoJefe({ cod: cod });
  }

  async findEquiposActivos() {
    let equipos = await this._repository.findEquiposActivos();
    const cuadrillaRepository = new CuadrillaRepository({ codProductor: this._codProductor });
    const cuadrillas = await cuadrillaRepository.find();

    if (cuadrillas.length > 0) {
      const equiposAsignados = equipos.filter(e => cuadrillas.find(c => c.imeiEquipo === e.macImei));

      return equipos.filter(e => !equiposAsignados.find(ea => ea.macImei === e.macImei));
    }

    return equipos;
  }

  async findByCodEquipo({ cod }) {
    const equipo = await this._repository.findByCodEquipo({ cod: cod });

    if (equipo.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return equipo[0];
  }

  async create({ equipo }) {
    return await this._repository.create(equipo);
  }

  async update({ equipo, cod }) {
    return await this._repository.update({
      codEquipo: cod,
      data: equipo,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codEquipo: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = EquipoService;
