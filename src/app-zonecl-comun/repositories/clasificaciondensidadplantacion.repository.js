const ClasificacionDensidadPlantacion = require('../models/clasificaciondensidadplantacion.model');
const { Op } = require('sequelize');

class ClasificacionDensidadPlantacionRepository {
  constructor() {}
  async findAll() {
    try {
      return await ClasificacionDensidadPlantacion.findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByCodClasificacionDensidad({ cod }) {
    try {
      return await ClasificacionDensidadPlantacion.findOne({
        where: {
          codClasificacionDensidad: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
module.exports = ClasificacionDensidadPlantacionRepository;
