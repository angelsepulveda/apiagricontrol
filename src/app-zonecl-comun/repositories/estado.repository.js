const Estado = require('../models/estado.model');
const { Op } = require('sequelize');

class EstadoRepository {
  constructor() {}
  async findAll() {
    try {
      return await Estado.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodEstado({ cod }) {
    try {
      return await Estado.findOne({
        where: {
          codEstado: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = EstadoRepository;
