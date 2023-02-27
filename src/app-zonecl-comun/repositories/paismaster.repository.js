const PaisMaster = require('../models/paismaster.model');
const { Op } = require('sequelize');

class PaisMasterRepository {
  constructor() {}
  async findAll() {
    try {
      return await PaisMaster.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodPais({ cod }) {
    try {
      return await PaisMaster.findOne({
        where: {
          codPais: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = PaisMasterRepository;
