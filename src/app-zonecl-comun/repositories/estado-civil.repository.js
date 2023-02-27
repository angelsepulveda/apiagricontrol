const EstadoCivil = require('../models/estado-civil.model');
const { Op } = require('sequelize');

class EstadoCivilRepository {
  constructor() {}
  async findAll() {
    try {
      /* Conectamos con la base de datos */
      return await EstadoCivil.findAll({
        attributes: ['codEstadoCivil', 'estadoCivil'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodEstadoCivil({ cod }) {
    try {
      return await EstadoCivil.findOne({
        where: {
          codEstadoCivil: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = EstadoCivilRepository;
