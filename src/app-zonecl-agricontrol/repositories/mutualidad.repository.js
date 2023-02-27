const Mutualidad = require('../models/mutualidad.model');
const { Op } = require('sequelize');

class MutualidadRepository {
  constructor({ codProductor }) {
    this._cod = codProductor;
  }

  async findAll() {
    try {
      return await Mutualidad(this._cod).findAll({
        attributes: ['codMutualidad', 'mutualidad'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodMutualidad({ cod }) {
    try {
      return await Mutualidad(this._cod).findOne({
        where: {
          codMutualidad: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = MutualidadRepository;
