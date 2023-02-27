const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Temporada = require('../models/temporada.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class TemporadaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
    this.server = new AppZonecAgricontrolServer({
      appZoneAgriControlDB: AppZoneAgriControlDB,
      codProductor: this._cod,
    });
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT CONVERT(t.CodTemporada,NCHAR) as codTemporada,t.CodEspecie as codEspecie,e.Especie as especie,t.Inicio as inicio,t.Termino as termino,t.Temporada as temporada,' +
            ' t.CodUserUpdate as codUserUpdate,t.FechaCreacion as fechaCreacion,t.FechaActualizacion as fechaActualizacion,t.CodEstado as codEstado,' +
            't.CodEquipo as codEquipo,t.Sincro as sincro,t.LastModified as lastModified ,t.ControlSincro as controlSincro FROM TB_GRAL_Temporada as t ' +
            'LEFT JOIN TB_GRAL_Especie as e ON t.CodEspecie = e.CodEspecie WHERE t.CodEstado = 1 OR t.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodTemporada({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT CONVERT(t.CodTemporada,NCHAR) as codTemporada,t.CodEspecie as codEspecie,e.Especie as especie,t.Inicio as inicio,t.Termino as termino,t.Temporada as temporada,' +
            ' t.CodUserUpdate as codUserUpdate,t.FechaCreacion as fechaCreacion,t.FechaActualizacion as fechaActualizacion,t.CodEstado as codEstado,' +
            't.CodEquipo as codEquipo,t.Sincro as sincro,t.LastModified as lastModified ,t.ControlSincro as controlSincro FROM TB_GRAL_Temporada as t ' +
            'LEFT JOIN TB_GRAL_Especie as e ON t.CodEspecie = e.CodEspecie ' +
            'WHERE t.CodTemporada = ' +
            cod +
            ' AND t.CodEstado = 1 OR t.CodEstado = 0',
        );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      const temporadaCreated = await Temporada(this._cod, this._lng).create({
        ...data,
        codTemporada: dateNumber(),
        fechaCreacion: new Date(),
        sincro: 0,
        codUserUpdate: 0,
        lastModified: dateNumber(),
      });

      return temporadaCreated;
    } catch (e) {
      throw e;
    }
  }

  async update({ codTemporada, data }) {
    try {
      await this.server.connect();

      const temporada = await Temporada(this._cod, this._lng).findOne({
        where: { codTemporada: codTemporada },
      });

      if (temporada === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await temporada.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });
      return temporada;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = TemporadaRepository;
