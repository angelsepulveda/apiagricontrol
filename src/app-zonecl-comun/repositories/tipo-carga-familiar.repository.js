const TipoCargaFamiliar = require('../models/tipo-carga-familiar.model');
const { Op } = require('sequelize');

class TipoCargaFamiliarRepository {
  constructor() {}
  async findAll() {
    try {
      return await TipoCargaFamiliar.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodTCargaFamiliar({ cod }) {
    try {
      return await TipoCargaFamiliar.findOne({
        where: {
          codTipoCargaFamiliar: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = TipoCargaFamiliarRepository;
