const CajaCompensacion = require('../models/caja-compensacion.model');
const { Op } = require('sequelize');

class CajaCompensacionRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      return await CajaCompensacion(this._cod, this._lng).findAll({
        attributes: ['codCajaCompensacion', 'cajaCompensacion'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodCajaCompensacion({ cod }) {
    try {
      return await CajaCompensacion(this._cod, this._lng).findOne({
        where: {
          codCajaCompensacion: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CajaCompensacionRepository;
