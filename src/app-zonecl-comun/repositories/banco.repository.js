const Banco = require('../models/banco.model');
const { Op } = require('sequelize');

class BancoRepository {
  constructor() {}

  async findAll() {
    try {
      return await Banco.findAll({
        attributes: ['codBanco', 'banco'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodBanco({ cod }) {
    try {
      return await Banco.findOne({
        where: {
          codBanco: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = BancoRepository;
