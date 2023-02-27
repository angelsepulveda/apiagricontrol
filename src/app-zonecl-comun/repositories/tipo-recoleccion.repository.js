const TipoRecoleccion = require('../models/tipo-recoleccion.model');
const { Op } = require('sequelize');

class TipoRecoleccionRepository {
  constructor() {}
  async findAll() {
    try {
      return await TipoRecoleccion.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodTipoRecoleccion({ cod }) {
    try {
      return await TipoRecoleccion.findOne({
        where: {
          codTipoRecoleccion: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TipoRecoleccionRepository;
