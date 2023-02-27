const TipoEquipo = require('../models/tipo-equipo.model');
const { Op } = require('sequelize');

class TipoEquipoRepository {
  constructor() {}
  async findAll() {
    try {
      return await TipoEquipo.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodTEquipo({ cod }) {
    try {
      return await TipoEquipo.findOne({
        where: {
          codTipoEquipo: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      aw;
      throw e;
    }
  }
}
module.exports = TipoEquipoRepository;
