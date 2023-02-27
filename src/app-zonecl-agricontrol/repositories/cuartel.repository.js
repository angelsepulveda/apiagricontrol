const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');
const AppZonecAgricontrolServer = require('../../shared/database/app-zonec-agricontrol-server');
const Cuartel = require('../models/cuartel.model');
const CuartelVariedad = require('../models/cuartel-variedad.model');
const { dateNumber } = require('../../shared/helpers/date.helper');
const { NotFoundException } = require('../../shared/exceptions');
const { loggerInfo, loggerError } = require('../../shared/helpers/logger.helper');

class CuartelRepository {
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
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(cu.CodCampo,NCHAR) as codCampo ,ca.Campo as campo ,CONVERT(cu.CodSector, NCHAR)  as codSector ,sec.Sector as sector ,cu.CodCuartel as codCuartel,
            cu.NemoTecnico as nemoTecnico,cu.NombreCorto as nombreCorto,
            cu.Cuartel as cuartel ,cu.AnioPlantacion as anioPlantacion,cu.Superficie as superficie ,cu.CodTipoCobertura as codTipoCobertura,cu.Organico as organico,
            cu.Productivo as productivo,cu.Poligono as poligono ,cu.NombreCortoPoligono as nombreCortoPoligono ,cu.NombrePoligono as nombrePoligono ,
            cu.EntreHilera as entreHilera, cu.SobreHilera as sobreHilera ,
            cu.NumPlantasPorHa as numPlantasPorHa,cu.CodClasificacionDensidad as codClasificacionDensidad,
            cu.CodUserUpdate as codCodUserUpdate ,cu.FechaCreacion as fechaCreacion,
            cu.FechaActualizacion as fechaActualizacion, cu.CodEstado as codEstado, cu.Sincro as sincro ,
            cu.LastModified as lastModified , cu.CodEquipo as codEquipo, cu.ControlSincro as controlSincro
             FROM TB_GRAL_Cuartel as cu LEFT JOIN TB_GRAL_Campo as ca ON cu.CodCampo = ca.CodCampo
            LEFT JOIN TB_GRAL_Sector as sec ON cu.CodSector = sec.CodSector WHERE cu.CodEstado = 1 OR cu.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findAllCodCampo({ codCampos }) {
    try {
      let whereCampos = ' ';

      codCampos.forEach(campo => (whereCampos = whereCampos + `cu.codCampo = ${campo.codCampo} or `));

      whereCampos = whereCampos.substring(0, whereCampos.length - 3);

      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(cu.CodCampo, NCHAR) as codCampo ,ca.Campo as campo ,CONVERT(cu.CodSector, NCHAR ) as codSector ,sec.Sector as sector ,cu.CodCuartel as codCuartel,
            cu.NemoTecnico as nemoTecnico,cu.NombreCorto as nombreCorto,
            cu.Cuartel as cuartel ,cu.AnioPlantacion as anioPlantacion,cu.Superficie as superficie ,cu.CodTipoCobertura as codTipoCobertura,cu.Organico as organico,
            cu.Productivo as productivo,cu.Poligono as poligono ,cu.NombreCortoPoligono as nombreCortoPoligono ,cu.NombrePoligono as nombrePoligono,
            cu.EntreHilera as entreHilera, cu.SobreHilera as sobreHilera,
            cu.NumPlantasPorHa as numPlantasPorHa,cu.CodClasificacionDensidad as codClasificacionDensidad,
            cu.CodUserUpdate as codCodUserUpdate ,cu.FechaCreacion as fechaCreacion,
            cu.FechaActualizacion as fechaActualizacion, cu.CodEstado as codEstado, cu.Sincro as sincro,
            cu.LastModified as lastModified , cu.CodEquipo as codEquipo, cu.ControlSincro as controlSincro
             FROM TB_GRAL_Cuartel as cu LEFT JOIN TB_GRAL_Campo as ca ON cu.CodCampo = ca.CodCampo
            LEFT JOIN TB_GRAL_Sector as sec ON cu.CodSector = sec.CodSector WHERE ${whereCampos} and cu.CodEstado = 1 OR cu.CodEstado = 0 `,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async findByCodCuartel({ codCuartel }) {
    try {
      /* asiganamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const [results] = await db.sequelize().query(
        `SELECT CONVERT(cu.CodCampo, NCHAR) as codCampo ,ca.Campo as campo ,CONVERT(cu.CodSector,NCHAR) as codSector ,sec.Sector as sector ,cu.CodCuartel as codCuartel ,
            cu.NemoTecnico as nemoTecnico,cu.NombreCorto as nombreCorto,
            cu.Cuartel as cuartel ,cu.AnioPlantacion as anioPlantacion,cu.Superficie as superficie ,cu.CodTipoCobertura as codTipoCobertura,cu.Organico as organico,
            cu.Productivo as productivo,cu.Poligono as poligono ,cu.NombreCortoPoligono as nombreCortoPoligono ,cu.NombrePoligono as nombrePoligono ,
            cu.EntreHilera as entreHilera, cu.SobreHilera as sobreHilera ,
            cu.NumPlantasPorHa as numPlantasPorHa,cu.CodClasificacionDensidad as codClasificacionDensidad,
            cu.CodUserUpdate as codCodUserUpdate ,cu.FechaCreacion as fechaCreacion,
            cu.FechaActualizacion as fechaActualizacion, cu.CodEstado as codEstado, cu.Sincro as sincro,
            cu.LastModified as lastModified , cu.CodEquipo as codEquipo, cu.ControlSincro as controlSincro
             FROM TB_GRAL_Cuartel as cu LEFT JOIN TB_GRAL_Campo as ca ON cu.CodCampo = ca.CodCampo
            LEFT JOIN TB_GRAL_Sector as sec ON cu.CodSector = sec.CodSector WHERE cu.CodCuartel =
            ${codCuartel}
             AND cu.CodEstado = 1 OR cu.CodEstado = 0`,
      );
      return results;
    } catch (e) {
      throw e;
    }
  }

  async create({ data, cuartelesVariedades }) {
    try {
      const codProductor = this._cod;
      const lng = this._lng;

      const db = new AppZoneAgriControlDB({ codProductor: codProductor });

      const codCuartel = dateNumber();
      //inserción de los cuarteles variedades
      await db.sequelize().transaction(async function (t) {
        let cuartelVariedadCreatedArray = [];
        await Cuartel(codProductor, lng).create(
          {
            ...data,
            codCuartel: codCuartel,
            fechaCreacion: new Date(),
            lastModified: dateNumber(),
            codUserUpdate: 1,
            sincro: 1,
          },
          { transaction: t },
        );

        for (let i = 0; i < cuartelesVariedades.length; i++) {
          let cuartelVariedadCreated = {
            ...cuartelesVariedades[i],
            codCampo: data.codCampo,
            codSector: data.codSector,
            codCuartel: codCuartel,
            fechaCreacion: new Date(),
            lastModified: dateNumber(),
            sincro: 1,
            codUserUpdate: 1,
            codEstado: 1,
          };

          let cuartelVariedadCreatedNew = await CuartelVariedad(codProductor, lng).create(
            {
              ...cuartelVariedadCreated,
            },
            { transaction: t },
          );
          cuartelVariedadCreatedArray.push(cuartelVariedadCreatedNew);
        }

        return Promise.all(cuartelVariedadCreatedArray)
          .then(function (result) {
            loggerInfo('funciono', result);
          })
          .catch(function (err) {
            loggerError('error', err);
          });
      });
    } catch (e) {
      throw e;
    }
  }

  async update({ codCuartel, data, cuartelesVariedades }) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        //asegurando existencia del cuartel
        const cuartel = await Cuartel(codProductor, lng).findOne({
          where: { codCuartel: codCuartel },
        });

        if (cuartel === null) {
          await this.server.disconnect();
          throw new NotFoundException(lng('notFound'));
        }

        //actualización de cuartel
        await cuartel.update(
          {
            ...data,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
          },
          { transaction: t },
        );

        // eliminación de las direcciones antiguas
        await CuartelVariedad(codProductor, lng).destroy(
          {
            where: {
              codCuartel: cuartel.codCuartel,
            },
          },
          { transaction: t },
        );

        // creación de las nuevas variedades
        let cuartelVariedadUpdatedArray = [];

        for (let i = 0; i < cuartelesVariedades.length; i++) {
          let cuartelVariedadUpdated = {
            ...cuartelesVariedades[i],
            codCampo: data.codCampo,
            codSector: data.codSector,
            codCuartel: cuartel.codCuartel,
            fechaActualizacion: new Date(),
            lastModified: dateNumber(),
            codEstado: 1,
            sincro: 1,
            codUserUpdate: 1,
          };
          let cuartelVariedadUpdatedNew = await CuartelVariedad(codProductor, lng).create(
            {
              ...cuartelVariedadUpdated,
            },
            { transaction: t },
          );
          cuartelVariedadUpdatedArray.push(cuartelVariedadUpdatedNew);
        }

        return Promise.all(cuartelVariedadUpdatedArray)
          .then(function (result) {
            loggerInfo('funciono', result);
          })
          .catch(function (err) {
            loggerError('error', err);
          });
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CuartelRepository;
