const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const Produccion = require('../models/produccion.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { v4: uuid } = require('uuid');

class ProduccionRepository {
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

      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db
        .sequelize()
        .query(
          'SELECT pr.CodProduccion as codProducccion, pr.CodCuadrilla as codCuadrilla, cd.Cuadrilla as cuadrilla, pr.CodJefeCuadrilla as codJefeCuadrilla,' +
            'pr.CodTrabajador as codTrabajador,tj.Nombres as nombres, pr.CodContratista as codContratista, ct.Nombre as nombre, ' +
            'pr.CodCampo as codCampo, ca.Campo as campo, pr.CodSector as codSector, sec.Sector as sector,' +
            'pr.CodCuartel as codCuartel, cu.Cuartel as cuartel, pr.Codvariedad as codVariedad, va.Variedad as variedad, ' +
            'pr.FechaCaptura as fechaCaptura, pr.FechaServer as fechaServer, pr.CodEquipoCaptura as codEquipoCaptura,' +
            'pr.CodUnidadMedida as codUnidadMedida, um.UnidadMedida as unidadMedida, pr.Valor as valor, pr.ValorPromedio as valorPromedio, ' +
            'pr.PesadoHuerto as pesadoHurto, pr.CodFormatoCosecha as codFormatoCosecha, fc.Descripcion as descripcion,' +
            'pr.Trato as trato, pr.FechaInsercion as fechaInsercion, pr.FolioPalet as folioPalet, pr.Bins as bins, pr.CodBins as codBins, ' +
            'b.CodBins as codBins , pr.CodGrupoBins as codGrupoBins, pr.CodQR as codQR, pr.Latitud as latitud, pr.Longitud as longitud,' +
            'pr.CodUserUpdate as codUserUpdate, pr.FechaCreacion as fechaCreacion, pr.FechaActualizacion as fechaActualizacion, ' +
            'pr.CodEstado as codEstado, pr.Sincro as Sincro, pr.LastModified as lastModified, pr.CodEquipo as codEquipo, pr.ControlSincro as controlSincro' +
            ' FROM ' +
            database +
            '.TB_COS_Produccion_2022 as pr ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Cuadrilla as cd ON pr.CodCuadrilla = cd.Cuadrilla ' +
            'LEFT JOIN ' +
            database +
            '.TB_RRHH_Trabajador as tj ON pr.CodTrabajador = tj.Nombres ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_Contratista as ct ON pr.CodContratista = ct.Nombre ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Campo as ca ON pr.CodCampo = ca.Campo ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Sector as sec ON pr.Codsector = sec.sector ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Cuartel as cu ON pr.CodCuartel = cu.Cuartel ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Variedad as va ON pr.CodVariedad = va.Variedad ' +
            'LEFT JOIN ' +
            'appzonec_comun.TB_COS_UnidadMedida as um ON pr.CodUnidadMedida = um.UnidadMedida ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_FormatoCosecha as fc ON pr.CodFormatocosecha = fc.Descripcion ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_BINS as b ON pr.CodBins = b.CodBins ' +
            'WHERE pr.CodEstado = 1 OR pr.CodEstado = 0',
        );

      // cerramos sesion
      await this.server.disconnect();

      return results;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async findByCodProduccion({ cod }) {
    try {
      /* Conectamos con la base de datos */
      await this.server.connect();
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const database = 'appzonec_agricontrol_' + this._cod.padStart(4, '0');

      const [results] = await db
        .sequelize()
        .query(
          'SELECT pr.CodProduccion as codProducccion, pr.CodCuadrilla as codCuadrilla, cd.Cuadrilla as cuadrilla, pr.CodJefeCuadrilla as codJefeCuadrilla,' +
            'pr.CodTrabajador as codTrabajador,tj.Nombres as nombres, pr.CodContratista as codContratista, ct.Nombre as nombre, ' +
            'pr.CodCampo as codCampo, ca.Campo as campo, pr.CodSector as codSector, sec.Sector as sector,' +
            'pr.CodCuartel as codCuartel, cu.Cuartel as cuartel, pr.Codvariedad as codVariedad, va.Variedad as variedad, ' +
            'pr.FechaCaptura as fechaCaptura, pr.FechaServer as fechaServer, pr.CodEquipoCaptura as codEquipoCaptura,' +
            'pr.CodUnidadMedida as codUnidadMedida, um.UnidadMedida as unidadMedida, pr.Valor as valor, pr.ValorPromedio as valorPromedio, ' +
            'pr.PesadoHuerto as pesadoHurto, pr.CodFormatoCosecha as codFormatoCosecha, fc.Descripcion as descripcion,' +
            'pr.Trato as trato, pr.FechaInsercion as fechaInsercion, pr.FolioPalet as folioPalet, pr.Bins as bins, pr.CodBins as codBins, ' +
            'b.CodBins as codBins , pr.CodGrupoBins as codGrupoBins, pr.CodQR as codQR, pr.Latitud as latitud, pr.Longitud as longitud,' +
            'pr.CodUserUpdate as codUserUpdate, pr.FechaCreacion as fechaCreacion, pr.FechaActualizacion as fechaActualizacion, ' +
            'pr.CodEstado as codEstado, pr.Sincro as Sincro, pr.LastModified as lastModified, pr.CodEquipo as codEquipo, pr.ControlSincro as controlSincro' +
            ' FROM ' +
            database +
            '.TB_COS_Produccion_2022 as pr ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Cuadrilla as cd ON pr.CodCuadrilla = cd.Cuadrilla ' +
            'LEFT JOIN ' +
            database +
            '.TB_RRHH_Trabajador as tj ON pr.CodTrabajador = tj.Nombres ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_Contratista as ct ON pr.CodContratista = ct.Nombre ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Campo as ca ON pr.CodCampo = ca.Campo ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Sector as sec ON pr.Codsector = sec.sector ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Cuartel as cu ON pr.CodCuartel = cu.Cuartel ' +
            'LEFT JOIN ' +
            database +
            '.TB_GRAL_Variedad as va ON pr.CodVariedad = va.Variedad ' +
            'LEFT JOIN ' +
            'appzonec_comun.TB_COS_UnidadMedida as um ON pr.CodUnidadMedida = um.UnidadMedida ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_FormatoCosecha as fc ON pr.CodFormatocosecha = fc.Descripcion ' +
            'LEFT JOIN ' +
            database +
            '.TB_COS_BINS as b ON pr.CodBins = b.CodBins ' +
            'WHERE pr.CodProduccion = ' +
            cod +
            ' AND pr.CodEstado = 1 OR pr.CodEstado = 0',
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
      await this.server.connect();

      const produccionCreated = await Produccion(this._cod).create({
        ...data,
        codProduccion: uuid(),
        fechaCreacion: new Date(),
        codEstado: 1,
        lastModified: dateNumber(),
      });

      await this.server.disconnect();

      return produccionCreated;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }
  async update({ cod, data }) {
    try {
      await this.server.connect();

      const produccion = await Produccion(this._cod).findByPk(cod);

      if (produccion === null) {
        await this.server.disconnect();
        throw new NotFoundException('Produccion no encontrada');
      }

      await produccion.update({
        ...data,
        fechaActualizacion: new Date(),
        lastModified: dateNumber(),
      });

      await this.server.disconnect();

      return produccion;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }
}
module.exports = ProduccionRepository;
