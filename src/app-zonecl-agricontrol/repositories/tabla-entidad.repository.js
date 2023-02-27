const { Op } = require('sequelize');
const TablaEntidad = require('../models/tabla-entidad.model');

class TablaEntidadRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      return await TablaEntidad(this._cod, this._lng).findAll({
        attributes: ['codTablaEntidad', 'tabla', 'codEstado'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TablaEntidadRepository;
