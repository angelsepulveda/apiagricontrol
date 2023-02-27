const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../shared/exceptions');
const TrabajadorCargaFamiliar = require('../models/trabajador-carga-familiar.model');
const { dateNumber } = require('../../shared/helpers/date.helper');

class TrabajadorCargaFamiliarRepository {
  constructor({ codProductor }) {
    this._cod = codProductor;
    this.server = new AppZonecAgricontrolServer({
      appZoneAgriControlDB: AppZoneAgriControlDB,
      codProductor: this._cod,
    });
  }

  async findAll() {
    try {
      /* Conectamos con la base de datos */
      await this.server.connect();

      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db
        .sequelize()
        .query(
          'SELECT t.CodTrabajadorCargaFamiliar as codTrabajadorCargaFamiliar,t.CodTrabajador as codTrabajador,' +
            't.fechaNacimiento as fechaNacimiento ,t.codSexo as codSexo,s.Sexo as sexo,' +
            't.CodTipoCargaFamiliar as codTipoCargaFamiliar,car.TipoCargaFamiliar as tipoCargaFamiliar ,t.CodRelacionFamiliar as codRelacionFamiliar,' +
            'r.RelacionFamiliar as relacionFamiliar FROM ' +
            database +
            '.TB_RRHH_TrabajadorCargaFamiliar as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo ' +
            'LEFT JOIN appzonec_comun.TB_RRHH_TipoCargaFamiliar as car ON t.CodTipoCargaFamiliar = car.CodTipoCargaFamiliar ' +
            'LEFT JOIN appzonec_comun.TB_RRHH_RelacionFamiliar as r ON t.CodRelacionFamiliar = r.CodRelacionFamiliar ' +
            'WHERE t.CodEstado = 1 OR t.CodEstado = 0',
        );

      await this.server.disconnect();
      return results;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async findByCodTrabajadorGargaFamiliar({ cod }) {
    try {
      /* Conectamos con la base de datos */
      await this.server.connect();

      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');
      const [results] = await db
        .sequelize()
        .query(
          'SELECT t.CodTrabajadorCargaFamiliar as codTrabajadorCargaFamiliar,t.CodTrabajador as codTrabajador,' +
            't.fechaNacimiento as fechaNacimiento ,t.codSexo as codSexo,s.Sexo as sexo,' +
            't.CodTipoCargaFamiliar as codTipoCargaFamiliar,car.TipoCargaFamiliar as tipoCargaFamiliar ,t.CodRelacionFamiliar as codRelacionFamiliar,' +
            'r.RelacionFamiliar as relacionFamiliar FROM ' +
            database +
            '.TB_RRHH_TrabajadorCargaFamiliar as t LEFT JOIN appzonec_comun.TB_GRAL_Sexo as s ON t.CodSexo = s.CodSexo ' +
            'LEFT JOIN appzonec_comun.TB_RRHH_TipoCargaFamiliar as car ON t.CodTipoCargaFamiliar = car.CodTipoCargaFamiliar ' +
            'LEFT JOIN appzonec_comun.TB_RRHH_RelacionFamiliar as r ON t.CodRelacionFamiliar = r.CodRelacionFamiliar ' +
            'WHERE t.CodTrabajadorCargaFamiliar = ' +
            cod +
            ' AND t.CodEstado = 1 OR t.CodEstado = 0',
        );

      await this.server.disconnect();
      return results;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async create(data) {
    try {
      //conectamos con la base de datos
      await this.server.connect();

      const trabajadorCargaFamiliarCreated = await TrabajadorCargaFamiliar(this._cod).create({
        ...data,
        codTrabajadorCargaFamiliar: dateNumber(),
        codEstado: 1,
        lastModified: dateNumber(),
      });

      //cerramos conexion base de datos
      await this.server.disconnect();

      return trabajadorCargaFamiliarCreated;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async update({ codTrabajadorCargaFamiliar, data }) {
    try {
      await this.server.connect();

      const trabajadorCargarFamiliar = await TrabajadorCargaFamiliar(this._cod).findByPk(codTrabajadorCargaFamiliar);

      if (trabajadorCargarFamiliar === null) {
        await this.server.disconnect();
        throw new NotFoundException('La carga familiar no existe');
      }

      await trabajadorCargarFamiliar.update({
        ...data,
        lastModified: dateNumber(),
      });

      await this.server.disconnect();
      return trabajadorCargarFamiliar;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }
}

module.exports = TrabajadorCargaFamiliarRepository;
