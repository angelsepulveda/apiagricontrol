const Calidad = require('../models/calidad.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { Op } = require('sequelize');
const { NotFoundException } = require('../../shared/exceptions');

class CalidadRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this.lng = lng;
  }

  async findAll() {
    return await Calidad(this._cod, this.lng).findAll({
      where: {
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }

  async findSelect() {
    return await Calidad(this._cod, this.lng).findAll({
      attributes: ['codCalidad', 'calidad'],
      where: {
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }

  async findByCodCalidad({ cod }) {
    return await Calidad(this._cod, this.lng).findOne({
      where: {
        codCalidad: cod,
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }
  async create(data) {
    //conectamos con la base de datos
    try {
      return await Calidad(this._cod, this.lng).create({
        ...data,
        codCalidad: dateNumber(),
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ cod, data }) {
    try {
      const calidad = await Calidad(this._cod, this.lng).findByPk(cod);

      if (calidad === null) {
        throw new NotFoundException(this.lng('notFound'));
      }

      await calidad.update({
        ...data,
        lastModified: dateNumber(),
      });

      return calidad;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CalidadRepository;
