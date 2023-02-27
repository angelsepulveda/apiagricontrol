const { Op } = require('sequelize');
const Pais = require('../models/pais.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const e = require('express');

class PaisRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      return await Pais(this._cod, this._lng).findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch {
      throw e;
    }
  }

  async findSelect() {
    try {
      return await Pais(this._cod, this._lng).findAll({
        attributes: ['codPais', 'pais'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch {
      throw e;
    }
  }

  async findByCodPais({ cod }) {
    try {
      return await Pais(this._cod, this._lng).findOne({
        where: {
          codPais: cod,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Pais(this._cod, this._lng).create({
        ...data,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ cod, data }) {
    try {
      const pais = await Pais(this._cod, this._lng).findByPk(cod);

      if (pais === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await pais.update({
        ...data,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = PaisRepository;
