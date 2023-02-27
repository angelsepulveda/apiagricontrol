const RelacionFamiliar = require('../models/relacion-familiar.model');
const { Op } = require('sequelize');

class RelacionFamiliarRepository {
  constructor() {}
  async findAll() {
    try {
      return await RelacionFamiliar.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodRelacionFamiliar({ cod }) {
    try {
      return await RelacionFamiliar.findOne({
        where: {
          codRelacionFamiliar: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = RelacionFamiliarRepository;
