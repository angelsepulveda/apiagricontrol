const Unidad = require('../models/unidad.model');
const { Op } = require('sequelize');

class UnidadRepository {
  constructor() {}
  async findAll() {
    try {
      return await Unidad.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodUnidad({ cod }) {
    try {
      return await Unidad.findOne({
        where: {
          codUnidad: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = UnidadRepository;
