const Productor = require('../models/productor.model');
const { Op } = require('sequelize');

class ProductorRepository {
  constructor() {}
  async findAll() {
    try {
      const productor = await Productor.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });

      return productor;
    } catch (e) {
      throw e;
    }
  }
  async findByCodProductor({ cod }) {
    try {
      /* asiganamos a que base datos debe conectar */

      const productor = await Productor.findOne({
        where: {
          codProductor: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
      return productor;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = ProductorRepository;
