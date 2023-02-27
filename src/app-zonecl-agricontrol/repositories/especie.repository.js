const { Op } = require('sequelize');
const Especie = require('../models/especie.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');

class EspecieRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      return await Especie(this._cod, this._lng).findAll({
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      return await Especie(this._cod, this._lng).findAll({
        attributes: ['codEspecie', 'especie'],
        where: {
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findByCodEspecie({ cod }) {
    try {
      return await Especie(this._cod, this._lng).findOne({
        where: {
          codEspecie: cod,
          [Op.or]: [{ codEstado: 1 }, { codEstado: 0 }],
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      const codEspecie = data.codEspecie;
      const especie = await Especie(this._cod, this._lng).findByPk(codEspecie, {
        attributes: ['codEspecie', 'codEstado'],
      });

      if (especie !== null) {
        if (especie.codEstado !== 1) {
          return await especie.update({
            codEstado: 1,
            lastModified: dateNumber(),
          });
        } else {
          throw new NotFoundException(this._lng('exits'));
        }
      }

      return await Especie(this._cod, this._lng).create({
        ...data,
        fechaCreacion: new Date(),
        codUserUpdate: 0,
        codEstado: 1,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async delete({ cod }) {
    try {
      const especie = await Especie(this._cod, this._lng).findByPk(cod);

      if (especie === null) {
        throw new NotFoundException(this.lng('notFound'));
      }

      await especie.update({
        codEstado: 2,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = EspecieRepository;
