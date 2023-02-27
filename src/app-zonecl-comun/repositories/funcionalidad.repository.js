const Funcionalidad = require('../models/funcionalidad.model');
const { Op } = require('sequelize');

class FuncionalidadRepository {
  constructor() {}
  async findAll() {
    try {
      return await Funcionalidad.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodFuncionalidad({ cod }) {
    try {
      return await Funcionalidad.findOne({
        where: {
          codFuncionalidad: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = FuncionalidadRepository;
