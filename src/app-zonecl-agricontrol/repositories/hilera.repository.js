const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const Hilera = require('../models/hilera.model');
const { NotFoundException } = require('../../shared/exceptions');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { Op } = require('sequelize');

class HileraRepository {
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

      const [results] = await db
        .sequelize()
        .query(
          'SELECT h.CodHilera as codHilera,h.CodCampo as codCampo,c.Campo as campo,h.CodSector as codSector,s.Sector as sector,' +
            'h.CodCuartel as codCuartel,cu.Cuartel as cuartel ,h.CodVariedad as codVariedad,' +
            'v.Variedad as variedad,h.CodHilera as codHilera,h.CodEstado as codEstado,' +
            'h.Sincro as sincro,h.LastModified as lastModified,h.ControlSincro as controlSincro FROM TB_GRAL_Hilera as h ' +
            'LEFT JOIN TB_GRAL_Campo as c ON h.CodCampo = c.CodCampo ' +
            'LEFT JOIN TB_GRAL_Sector as s ON h.CodSector = s.CodSector ' +
            'LEFT JOIN TB_GRAL_Cuartel as cu ON h.CodCuartel = cu.CodCuartel ' +
            'LEFT JOIN TB_GRAL_Variedad as v ON h.CodVariedad = v.CodVariedad ' +
            'WHERE h.CodEstado = 1 OR h.CodEstado = 0',
        );

      await this.server.disconnect();
      return results;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async findByCodHileraCampoSectorCuartelVariedad({ codCampo, codSector, codCuartel, codVariedad, codHilera }) {
    try {
      /* Conectamos con la base de datos */
      await this.server.connect();

      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db
        .sequelize()
        .query(
          'SELECT h.CodHilera as codHilera,h.CodCampo as codCampo,c.Campo as campo,h.CodSector as codSector,s.Sector as sector,' +
            'h.CodCuartel as codCuartel,cu.Cuartel as cuartel ,h.CodVariedad as codVariedad,' +
            'v.Variedad as variedad,h.CodHilera as codHilera,h.CodEstado as codEstado,' +
            'h.Sincro as sincro,h.LastModified as lastModified,h.ControlSincro as controlSincro FROM TB_GRAL_Hilera as h ' +
            'LEFT JOIN TB_GRAL_Campo as c ON h.CodCampo = c.CodCampo ' +
            'LEFT JOIN TB_GRAL_Sector as s ON h.CodSector = s.CodSector ' +
            'LEFT JOIN TB_GRAL_Cuartel as cu ON h.CodCuartel = cu.CodCuartel ' +
            'LEFT JOIN TB_GRAL_Variedad as v ON h.CodVariedad = v.CodVariedad ' +
            'WHERE h.CodHilera = ' +
            codHilera +
            ' AND h.CodCampo = ' +
            codCampo +
            ' AND h.CodSector = ' +
            codSector +
            ' AND h.CodCuartel = ' +
            codCuartel +
            ' AND h.CodVariedad = ' +
            codVariedad +
            ' AND h.CodEstado = 1 OR h.CodEstado = 0',
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

      const hileraCreated = await Hilera(this._cod).create({
        ...data,
        codEstado: 1,
        lastModified: dateNumber(),
      });

      //cerramos conexion base de datos
      await this.server.disconnect();

      return hileraCreated;
    } catch (e) {
      await this.server.disconnect();
      throw e;
    }
  }

  async update({ codCampo, codSector, codCuartel, codVariedad, codHilera, data }) {
    await this.server.connect();

    const hilera = await Hilera(this._cod).findOne({
      where: {
        [Op.and]: [
          { codCuartel: codCuartel },
          { codCampo: codCampo },
          { codSector: codSector },
          { codVariedad: codVariedad },
          { codHilera: codHilera },
        ],
      },
    });

    if (hilera === null) {
      await this.server.disconnect();
      throw new NotFoundException('Hilera no encontrada');
    }

    await hilera.update({
      ...data,
      lastModified: dateNumber(),
    });

    return hilera;
  }
}

module.exports = HileraRepository;
