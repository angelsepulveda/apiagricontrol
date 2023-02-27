const Sexo = require('../models/sexo.model');
const { Op } = require('sequelize');

class SexoRepository {
  constructor() {}
  async findAll() {
    try {
      return await Sexo.findAll({
        attributes: ['codSexo', 'sexo','nemoTecnico'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodSexo({ cod }) {
    try {
      return await Sexo.findOne({
        where: {
          codSexo: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = SexoRepository;
