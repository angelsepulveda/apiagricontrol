const Salud = require('../models/salud.model');
const { Op } = require('sequelize');

class SaludRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      return await Salud(this._cod, this._lng).findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodSalud({ cod }) {
    try {
      return await Salud(this._cod, this._lng).findOne({
        where: {
          codSalud: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = SaludRepository;
