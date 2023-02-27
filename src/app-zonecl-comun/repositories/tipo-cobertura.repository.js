const TipoCobertura = require('../models/tipo-cobertura.model');
const { Op } = require('sequelize');

class TipoCoberturaRepository {
  constructor() {}
  async findAll() {
    try {
      return await TipoCobertura.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodTCobertura({ cod }) {
    try {
      return await TipoCobertura.findOne({
        where: {
          codTipoCobertura: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = TipoCoberturaRepository;
