const Moneda = require('../models/moneda.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { Op } = require('sequelize');

class MonedaRepository {
  constructor({ codProductor }) {
    this._cod = codProductor;
  }

  async findAll() {
    try {
      return await Moneda(this._cod).findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodMoneda({ cod }) {
    try {
      return await Moneda(this._cod).findOne({
        where: {
          codMoneda: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Moneda(this._cod).create({
        ...data,
        codMoneda: dateNumber(),
        codEstado: 1,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codMoneda, data }) {
    try {
      const moneda = await Moneda(this._cod).findByPk(codMoneda);

      if (moneda === null) {
        throw new NotFoundException('La moneda no existe');
      }

      await moneda.update({
        ...data,
        lastModified: dateNumber(),
      });

      return moneda;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = MonedaRepository;
