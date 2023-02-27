const EspecieMaster = require('../models/especiemaster.model');
const { Op } = require('sequelize');

class EspecieMasterRepository {
  constructor() {}
  async findAll() {
    try {
      return await EspecieMaster.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodEspecie({ cod }) {
    try {
      return await EspecieMaster.findOne({
        where: {
          codEspecie: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = EspecieMasterRepository;
