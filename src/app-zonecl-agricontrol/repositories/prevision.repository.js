const Prevision = require('../models/prevision.model');
const { Op } = require('sequelize');

class PrevisionRepository {
  constructor({ codProductor }) {
    this._cod = codProductor;
  }

  async findAll() {
    try {
      return await Prevision(this._cod).findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodPrevision({ cod }) {
    try {
      return await Prevision(this._cod).findOne({
        where: {
          codPrevision: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = PrevisionRepository;
