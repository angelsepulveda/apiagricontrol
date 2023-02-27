const Contratista = require('../models/contratista.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { Op } = require('sequelize');

class ContratistaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    return await Contratista(this._cod, this._lng).findAll({
      where: {
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }

  async findSelect() {
    return await Contratista(this._cod, this._lng).findAll({
      attributes: ['codContratista', 'nombre'],
      where: {
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }

  async findByCodContratista({ cod }) {
    return await Contratista(this._cod, this._lng).findOne({
      where: {
        codContratista: cod,
        [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
      },
    });
  }

  async create(data) {
    try {
      return await Contratista(this._cod, this._lng).create({
        ...data,
        codContratista: dateNumber(),
        fechaCreacion: new Date(),
        sincro: 0,
        codUserUpdate: 0,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ cod, data }) {
    try {
      const contratista = await Contratista(this._cod, this._lng).findByPk(cod);

      if (contratista === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await contratista.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });

      return contratista;
    } catch (e) {
      throw e;
    }
  }
}
module.exports = ContratistaRepository;
