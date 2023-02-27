const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const Equipo = require('../models/equipo.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class EquipoRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async findAll() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db
        .sequelize()
        .query(
          'SELECT e.CodEquipo as codEquipo, e.MacImei as macImei,t.TipoEquipo as tipoEquipo ,e.CodTipoEquipo as codTipoEquipo,e.Alias as alias,' +
            'e.Descripcion as descripcion,e.Fecha as fecha,e.UltimaSincronizacion as ultimaSincronizacion,' +
            'e.BaseDatosLocal as baseDatosLocal,e.CodUserUpdate as codUserUpdate,e.FechaCreacion as fechaCreacion,' +
            'e.FechaActualizacion as fechaActualizacion,e.CodVersionApp as codVersionApp,e.CodVersionBD as codVersionBD,' +
            'e.CodEstado as codEstado ,e.Sincro as sincro ,e.LastModified as lastModified,e.ControlSincro  as controlSincro FROM ' +
            database +
            '.TB_GRAL_Equipo as e LEFT JOIN appzonec_comun.TB_GRAL_TipoEquipo as t ON e.CodTipoEquipo = t.CodTipoEquipo ' +
            'WHERE e.CodEstado = 1 OR e.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findSelect() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db
        .sequelize()
        .query(
          'SELECT e.CodEquipo as codEquipo,e.Descripcion as descripcion, e.MacImei as macImei FROM ' +
            database +
            '.TB_GRAL_Equipo as e LEFT JOIN appzonec_comun.TB_GRAL_TipoEquipo as t ON e.CodTipoEquipo = t.CodTipoEquipo ' +
            'WHERE e.CodEstado = 1 OR e.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodEquipo({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db
        .sequelize()
        .query(
          'SELECT e.CodEquipo as codEquipo,e.MacImei as macImei ,t.TipoEquipo as tipoEquipo ,e.CodTipoEquipo as codTipoEquipo,e.Alias as alias,' +
            'e.Descripcion as descripcion,e.Fecha as fecha,e.UltimaSincronizacion as ultimaSincronizacion,' +
            'e.BaseDatosLocal as baseDatosLocal,e.CodUserUpdate as codUserUpdate,e.FechaCreacion as fechaCreacion,' +
            'e.FechaActualizacion as fechaActualizacion,e.CodVersionApp as codVersionApp,e.CodVersionBD as codVersionBD,' +
            'e.CodEstado as codEstado ,e.Sincro as sincro ,e.LastModified as lastModified,e.ControlSincro  as controlSincro FROM ' +
            database +
            '.TB_GRAL_Equipo as e LEFT JOIN appzonec_comun.TB_GRAL_TipoEquipo as t ON e.CodTipoEquipo = t.CodTipoEquipo ' +
            'WHERE e.CodEquipo =' +
            cod +
            ' AND e.CodEstado = 1 OR e.CodEstado = 0',
        );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodEquipoJefe({ cod }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db.sequelize().query(
        `SELECT e.CodEquipo as codEquipo,e.MacImei as macImei ,t.TipoEquipo as tipoEquipo ,e.CodTipoEquipo as codTipoEquipo,e.Alias as alias,
            e.Descripcion as descripcion,e.Fecha as fecha,e.UltimaSincronizacion as ultimaSincronizacion,
            CONCAT(e.MacImei, '  —  ' ,e.Descripcion) as equipo  FROM
            ${database}
            .TB_GRAL_Equipo as e LEFT JOIN appzonec_comun.TB_GRAL_TipoEquipo as t ON e.CodTipoEquipo = t.CodTipoEquipo
            WHERE e.MacImei = '${cod}' AND e.CodEstado != 2`,
      );

      return results[0];
    } catch (e) {
      throw e;
    }
  }

  async findEquiposActivos() {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db.sequelize().query(
        `SELECT e.CodEquipo as codEquipo,e.MacImei as macImei ,t.TipoEquipo as tipoEquipo ,e.CodTipoEquipo as codTipoEquipo,e.Alias as alias,
            e.Descripcion as descripcion,e.Fecha as fecha,e.UltimaSincronizacion as ultimaSincronizacion,
            CONCAT(e.MacImei, '  —  ' ,e.Descripcion) as equipo,
            e.BaseDatosLocal as baseDatosLocal,e.FechaCreacion as fechaCreacion,
            e.FechaActualizacion as fechaActualizacion,e.CodVersionApp as codVersionApp,e.CodVersionBD as codVersionBD,
            e.CodEstado as codEstado FROM
            ${database}
            .TB_GRAL_Equipo as e LEFT JOIN appzonec_comun.TB_GRAL_TipoEquipo as t ON e.CodTipoEquipo = t.CodTipoEquipo
            WHERE e.CodEstado != 2`,
      );

      return results;
    } catch (e) {
      throw e;
    }
  }

  async create(data) {
    try {
      return await Equipo(this._cod, this._lng).create({
        ...data,
        codUserUpdate: 0,
        fecha: new Date(),
        ultimaSincronizacion: new Date(),
        baseDatosLocal: 0,
        fechaCreacion: new Date(),
        codEstado: 1,
        sincro: 0,
        lastModified: dateNumber(),
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codEquipo, data }) {
    try {
      const equipo = await Equipo(this._cod, this._lng).findByPk(codEquipo);

      if (equipo === null) {
        throw new NotFoundException(this._lng('notFound'));
      }

      await equipo.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });

      return equipo;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = EquipoRepository;
