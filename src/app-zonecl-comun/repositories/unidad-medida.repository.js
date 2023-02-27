const UnidadMedida = require('../models/unidad-medida.model');
const { Op } = require('sequelize');

class UnidadMedidaRepository {
  constructor() {}

  async findAll() {
    try {
      return await UnidadMedida.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodUnidadMedida({ cod }) {
    try {
      return await UnidadMedida.findOne({
        where: {
          codUnidadMedida: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UnidadMedidaRepository;
