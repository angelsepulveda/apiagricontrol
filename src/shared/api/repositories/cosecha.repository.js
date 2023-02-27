const AppZoneAgriControlDB = require('../../database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../../exceptions');
const { formatDate, dateNumber } = require('../../helpers/date.helper');
const { cosechaFromTables, searchOneSchema } = require('../../helpers/informes.helper');
const Cosecha = require('../models/cosecha.model');
const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');
const { loggerInfo, loggerError } = require('../../helpers/logger.helper');

class CosechaRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async informeCompleto(fechaDesde, fechaHasta) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const especie = '';
      const bins = 0;
      const desde = formatDate(new Date(fechaDesde));
      const hasta = formatDate(new Date(fechaHasta));

      const from = await cosechaFromTables(desde, hasta, this._cod);

      const sql = `select PROD.FechaCaptura AS fechaCaptura,
                C.Campo AS campo,
                S.Sector AS sector,
                ES.Especie AS especie,
                V.Variedad AS variedad,
                CON.Nombre AS nombreContratista,
                TRA.CodTrabajador AS dni,
                CONCAT(TRA.PrimerApellido,' ',TRA.SegundoApellido,' ',TRA.Nombres) AS empleado,
                CU.Cuadrilla AS cuadrilla,
                FC.Descripcion AS bandeja,
                CA.Calidad AS calidad,
                FC.UnidadesAPesar AS unidadesAPesar,
                PROD.Valor AS kilos,
                EQ.Descripcion AS celular
                from ${from} PROD
                left join TB_GRAL_Campo C on PROD.CodCampo=C.CodCampo
                left join TB_GRAL_Sector S on PROD.CodSector=S.CodSector
                left join TB_GRAL_Variedad V on V.CodVariedad=PROD.CodVariedad
                left join TB_GRAL_Especie ES on V.CodEspecie=ES.CodEspecie
                left join TB_COS_FormatoCosecha FC on FC.CodFormatoCosecha=PROD.CodFormatoCosecha
                left join TB_COS_Calidad CA on FC.CodCalidad=CA.CodCalidad
                left join TB_RRHH_Trabajador TRA on PROD.CodTrabajador=TRA.CodTrabajador
                left join TB_GRAL_Cuadrilla CU on PROD.CodCuadrilla=CU.Cuadrilla
                left join TB_COS_Contratista CON on PROD.CodContratista=CON.CodContratista
                left join TB_GRAL_Equipo EQ on PROD.CodEquipoCaptura=EQ.CodEquipo
                where PROD.CodEstado=1
                -- and V.CodEspecie='${especie}'
                and PROD.Bins=${bins}
                and PROD.FechaCaptura between '${desde} 00:00:00' AND '${hasta} 23:59:59'
                order by PROD.FechaCaptura,C.Campo,S.Sector,ES.Especie,V.Variedad,CON.Nombre,TRA.CodTrabajador`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async informeDiarioDetallado({ fecha, campo, especie }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      await searchOneSchema(PROD, this._cod);

      const whereCampo = campo !== '0' ? `and C.CodCampo = ${campo}` : '';

      const sql = `SELECT DATE_FORMAT(PROD.FechaCaptura, "%d-%m-%Y  %H:%i:%S") AS fechaCaptura,
                          C.Campo AS campo,
                          S.Sector AS sector,
                          CUA.Cuartel as cuartel,
                          ES.Especie AS especie,
                          V.Variedad AS variedad,
                          CON.Nombre AS nombreContratista,
                          TRA.CodTrabajador AS dni,
                          PROD.CodCuadrilla as codCuadrilla,
                          CONCAT(TRA.PrimerApellido,' ',TRA.SegundoApellido,' ',TRA.Nombres) AS empleado,
                          CU.Cuadrilla AS cuadrilla,
                          FC.Descripcion AS bandeja,
                          CA.Calidad AS calidad,
                          FC.UnidadesAPesar AS unidadesAPesar,
                          PROD.Valor AS kilos,
                          EQ.Descripcion AS celular
                    FROM ${PROD} AS PROD
                           left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                           left join TB_GRAL_Sector S on PROD.CodSector = S.CodSector
                           left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                           left join TB_GRAL_Cuartel CUA on PROD.CodCuartel=CUA.CodCuartel
                           left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                           left join TB_COS_FormatoCosecha FC on FC.CodFormatoCosecha = PROD.CodFormatoCosecha
                           left join TB_COS_Calidad CA on FC.CodCalidad = CA.CodCalidad
                           left join TB_RRHH_Trabajador TRA on PROD.CodTrabajador = TRA.CodTrabajador
                           left join TB_GRAL_Cuadrilla CU on PROD.CodCuadrilla = CU.CodCuadrilla
                           left join TB_COS_Contratista CON on PROD.CodContratista = CON.CodContratista
                           left join TB_GRAL_Equipo EQ on PROD.CodEquipoCaptura = EQ.CodEquipo
                   where PROD.CodEstado = 1
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     and PROD.Bins=${bins}
                     ${whereCampo}
                     and ES.CodEspecie = ${especie}
                   order by PROD.FechaCaptura, C.Campo, S.Sector, ES.Especie, V.Variedad, CON.Nombre, TRA.CodTrabajador`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async informeDiarioResumido({ fecha, campo, especie }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      await searchOneSchema(PROD, this._cod);
      const whereCampo = campo !== '0' ? `and C.CodCampo = ${campo}` : '';

      const sql = `SELECT DATE_FORMAT(PROD.FechaCaptura, "%d-%m-%Y") AS fechaCaptura,
                          C.Campo AS campo,
                          S.Sector AS sector,
                          CUA.Cuartel as cuartel,
                          ES.Especie AS especie,
                          V.Variedad AS variedad,
                          CON.Nombre AS nombreContratista,
                          TRA.CodTrabajador AS dni,
                          CONCAT(TRA.PrimerApellido,' ',TRA.SegundoApellido,' ',TRA.Nombres) AS empleado,
                          CU.Cuadrilla AS cuadrilla,
                          FC.Descripcion AS bandeja,
                          CA.Calidad AS calidad,
                          FC.UnidadesAPesar AS unidadesAPesar,
                          SUM(PROD.Valor) AS kilos,
                          EQ.Descripcion AS celular
                   FROM ${PROD} AS PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Sector S on PROD.CodSector = S.CodSector
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Cuartel CUA on PROD.CodCuartel=CUA.CodCuartel
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_COS_FormatoCosecha FC on FC.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join TB_COS_Calidad CA on FC.CodCalidad = CA.CodCalidad
                          left join TB_RRHH_Trabajador TRA on PROD.CodTrabajador = TRA.CodTrabajador
                          left join TB_GRAL_Cuadrilla CU on PROD.CodCuadrilla = CU.CodCuadrilla
                          left join TB_COS_Contratista CON on PROD.CodContratista = CON.CodContratista
                          left join TB_GRAL_Equipo EQ on PROD.CodEquipoCaptura = EQ.CodEquipo
                   where PROD.CodEstado = 1
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     and PROD.Bins=${bins}
                     ${whereCampo}
                     and ES.CodEspecie = ${especie}
                   group by TRA.CodTrabajador, C.CodCampo
                   order by PROD.FechaCaptura,TRA.CodTrabajador`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async informeCompletoGrafico({ fechaDesde, fechaHasta, codCampo }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const desde = formatDate(new Date(fechaDesde));
      const hasta = formatDate(new Date(fechaHasta));

      const from = await cosechaFromTables(desde, hasta, this._cod);

      const whereCampo = codCampo !== '0' ? `and C.CodCampo = ${codCampo}` : '';

      const sql = `select
                          V.Variedad as arg,
                          PROD.Valor AS val,
                          ES.Especie as parentID
                   from ${from} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampo}
                     and PROD.FechaCaptura between '${desde} 00:00:00' AND '${hasta} 23:59:59'
                   order by PROD.FechaCaptura`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async informeCompletoGraficoResumido({ fechaDesde, fechaHasta, codCampo }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const desde = formatDate(new Date(fechaDesde));
      const hasta = formatDate(new Date(fechaHasta));

      const from = await cosechaFromTables(desde, hasta, this._cod);
      const whereCampo = codCampo !== '0' ? `and C.CodCampo = ${codCampo}` : '';

      const sql = `select
                          ES.Especie as arg,
                          SUM(PROD.Valor) AS val,
                          '' as parentID
                   from ${from} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_RRHH_Trabajador TRA on PROD.CodTrabajador = TRA.CodTrabajador
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampo}
                     and PROD.FechaCaptura between '${desde} 00:00:00' AND '${hasta} 23:59:59'
                   order by PROD.FechaCaptura`;

      const [results] = await db.sequelize().query(sql);

      return results;

      return [];
    } catch (e) {
      throw e;
    }
  }

  async informeDiarioGrafico({ fecha, codCampo, codEspecie }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereCampo = codCampo !== '0' ? `and C.CodCampo = ${codCampo}` : '';
      const whereEspecie = codEspecie !== '0' ? `and ES.CodEspecie = ${codEspecie}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          V.Variedad as variedad
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampo}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                   order by PROD.FechaCaptura`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async findMoreRecent() {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const year = new Date().getFullYear().toString();

      const PROD = `TB_COS_Produccion_${year}`;

      await searchOneSchema(PROD, this._cod);

      const sql = `SELECT PROD.FechaCaptura as fechaCaptura FROM ${PROD} AS PROD ORDER BY PROD.FechaCaptura DESC LIMIT 1`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchProduccion(filter) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(filter.fecha));
      const year = new Date(filter.fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      await searchOneSchema(PROD, this._cod);

      const whereCampo = `and PROD.CodCampo = ${filter.campo}`;
      const whereEspecie = `and ES.CodEspecie = ${filter.especie}`;
      const whereCuartel =
        filter.cuartel !== undefined && filter.cuartel !== '0' ? `and PROD.CodCuartel = ${filter.cuartel}` : '';

      const whereVariedad =
        filter.variedad !== undefined && filter.variedad !== '0' ? `and PROD.CodVariedad = ${filter.variedad}` : '';
      const whereTrabajador =
        filter.trabajador !== undefined && filter.variedad !== '0'
          ? `and PROD.CodTrabajador = ${filter.trabajador.toString()}`
          : '';
      const whereEquipo =
        filter.equipo !== undefined && filter.equipo !== '0' ? `and PROD.CodEquipoCaptura = ${filter.equipo}` : '';
      const whereCuadrilla =
        filter.cuadrilla !== undefined && filter.cuadrilla !== '0' ? `and PROD.CodCuadrilla = ${filter.cuadrilla}` : '';
      const whereContratista =
        filter.contratista !== undefined && filter.contratista !== '0'
          ? `and PROD.CodContratista = ${filter.contratista}`
          : '';
      const whereFormatoCosecha =
        filter.formatosCosecha !== undefined && filter.formatoCosecha !== '0'
          ? `and PROD.CodFormatoCosecha = ${filter.formatoCosecha}`
          : '';

      const sql = `SELECT PROD.CodProduccion as codProduccion, DATE_FORMAT(PROD.FechaCaptura, "%d/%m/%Y %H:%i:%S") AS fechaCaptura,
                          PROD.fechaCaptura as fechaCapturaData,
                          C.Campo AS campo,
                          S.Sector AS sector,
                          CUA.Cuartel as cuartel,
                          CONVERT(PROD.CodCampo,NCHAR) as codCampo,
                          ES.Especie AS especie,
                          V.Variedad AS variedad,
                          CON.Nombre AS nombreContratista,
                          CONVERT(CU.CodJefeCuadrilla,NCHAR) as codJefeCuadrilla,
                          CONCAT(JC.PrimerApellido,' ',JC.SegundoApellido,' ',JC.Nombres) as jefeCuadrilla,
                          TRA.CodTrabajador AS dni,
                          PROD.Trato as trato,
                          PROD.CodCuadrilla as codCuadrilla,
                          CONCAT(TRA.PrimerApellido,' ',TRA.SegundoApellido,' ',TRA.Nombres) AS empleado,
                          CU.Cuadrilla AS cuadrilla,
                          FC.Descripcion AS bandeja,
                          CA.Calidad AS calidad,
                          FC.UnidadesAPesar AS unidadesAPesar,
                          PROD.Valor AS kilos,
                          EQ.Descripcion AS celular
                    FROM ${PROD} AS PROD
                           left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                           left join TB_GRAL_Sector S on PROD.CodSector = S.CodSector
                           left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                           left join TB_GRAL_Cuartel CUA on PROD.CodCuartel=CUA.CodCuartel
                           left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                           left join TB_COS_FormatoCosecha FC on FC.CodFormatoCosecha = PROD.CodFormatoCosecha
                           left join TB_COS_Calidad CA on FC.CodCalidad = CA.CodCalidad
                           left join TB_RRHH_Trabajador TRA on PROD.CodTrabajador = TRA.CodTrabajador
                           left join TB_GRAL_Cuadrilla CU on PROD.CodCuadrilla = CU.CodCuadrilla
                           left join TB_COS_Contratista CON on PROD.CodContratista = CON.CodContratista
                           left join TB_GRAL_Equipo EQ on PROD.CodEquipoCaptura = EQ.CodEquipo
                           left join TB_RRHH_Trabajador JC on PROD.CodJefeCuadrilla = JC.CodTrabajador
                   where PROD.CodEstado = 1
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     and PROD.Bins=${bins}
                     ${whereCampo}
                     ${whereCuartel}
                     ${whereEspecie}
                     ${whereCuadrilla}
                     ${whereTrabajador}
                     ${whereVariedad}
                     ${whereContratista}
                     ${whereFormatoCosecha}
                     ${whereEquipo}
                   order by PROD.FechaCaptura, C.Campo, S.Sector, ES.Especie, V.Variedad, CON.Nombre, TRA.CodTrabajador`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async updateProduccion(data) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        let cosechas = [];

        const codProducciones = data.producciones.map(produccion => produccion.codProduccion);

        //validaciones
        const year = new Date(data.producciones[0].fechaCaptura).getFullYear();
        const PROD = `TB_COS_Produccion_${year}`;
        await searchOneSchema(PROD, codProductor);

        const cosecha = await Cosecha(codProductor, PROD, lng).findByPk(data.producciones[0].codProduccion, {
          transaction: t,
        });

        const yearCaptura = new Date(cosecha.fechaCaptura).getFullYear();

        let yearNewCaptura = new Date();

        if (data.values.fechaCaptura === undefined) {
          yearNewCaptura = yearCaptura;
        } else {
          yearNewCaptura = new Date(data.values.fechaCaptura).getFullYear();
        }

        if (yearCaptura === yearNewCaptura) {
          //actualizacion de los datos
          await Cosecha(codProductor, PROD, lng).update(
            {
              ...data.values,
              fechaActualizacion: new Date(),
              lastModified: dateNumber(),
            },
            { where: { codProduccion: { [Op.in]: codProducciones } } },
            { transaction: t },
          );
        } else {
          let dataCosecha = {};
          const dataCosechas = [];

          const newPROD = `TB_COS_Produccion_${yearNewCaptura}`;
          //dateNew.setHours(new Date(data.values.fechaCaptura).getHours());
          //dateNew.setMinutes(new Date(data.values.fechaCaptura).getMinutes());
          //dateNew.setSeconds(new Date(data.values.fechaCaptura).getSeconds());

          const cosechas = await Cosecha(codProductor, PROD, lng).findAll(
            { where: { codProduccion: { [Op.in]: codProducciones } } },
            {
              transaction: t,
            },
          );

          if (cosechas.length <= 0) {
            t.rollback();
            throw new NotFoundException(lng('notFound'));
          }

          // asignando los datos nuevos con la copia anterior
          for (let i = 0; i < cosechas.length; i++) {
            const cosecha = cosechas[i];

            dataCosecha = {
              codCampo: cosecha.codCampo,
              codSector: data.values.codSector !== undefined ? data.values.codSector : cosecha.codSector,
              codVariedad: data.values.codVariedad !== undefined ? data.values.codVariedad : cosecha.codVariedad,
              codFormatoCosecha:
                data.values.codVariedad !== undefined ? data.values.codFormatoCosecha : cosecha.codFormatoCosecha,
              codCuadrilla: data.values.coCuadrilla !== undefined ? data.values.codCuadrilla : cosecha.codCuadrilla,
              codContratista:
                data.values.codContratista !== undefined ? data.values.codContratista : cosecha.codContratista,
              codCuartel: data.values.codCuartel !== undefined ? data.values.codCuartel : cosecha.codCuartel,
              codJefeCuadrilla:
                data.values.codSJefeCuadrilla !== undefined ? data.values.codJefeCuadrilla : cosecha.codJefeCuadrilla,
              codTrabajador:
                data.values.codTrabajador !== undefined ? data.values.codTrabajador : cosecha.codTrabajador,
              valor: cosecha.valor,
              codEstado: 1,
              codCalidad: data.values.codCalidad !== undefined ? data.values.codCalidad : cosecha.codCalidad,
              valorPromedio: cosecha.valorPromedio,
              codUnidadMedida: cosecha.codUnidadMedida,
              pesadoHuerto: cosecha.pesadoHuerto,
              trato: data.values.trato !== undefined ? data.values.trato : cosecha.trato,
              fechaInsercion: cosecha.fechaInsercion,
              sincro: cosecha.sincro,
              controlSincro: cosecha.controlSincro,
              longitud: cosecha.longitud,
              latitud: cosecha.latitud,
              codQR: cosecha.codQR,
              folioPalet: cosecha.folioPalet,
              codGrupoBins: cosecha.codGrupoBins,
              codEquipo: cosecha.codEquipo,
              bins: cosecha.bins,
              codEquipoCaptura: cosecha.codEquipoCaptura,
              fechaCaptura: data.values.fechaCaptura,
              codProduccion: uuid(),
              fechaActualizacion: new Date(),
              fechaCreacion: new Date(),
              lastModified: dateNumber(),
              fechaServer: data.values.fechaCaptura,
              codUserUpdate: 2,
            };

            dataCosechas.push(dataCosecha);
          }

          // cambiando el estado de los registros en la tabla anterior
          await Cosecha(codProductor, PROD, lng).update(
            {
              codEstado: 2,
            },
            { where: { codProduccion: { [Op.in]: codProducciones } } },
            { transaction: t },
          );

          // insertando datos en nueva tabla
          await Cosecha(codProductor, newPROD, lng).bulkCreate(dataCosechas, { transaction: t });
        }

        return Promise.all(cosechas)
          .then(function (result) {
            loggerInfo('funciono', result);
          })
          .catch(function (err) {
            loggerError('error', err);
          });
      });
    } catch (e) {
      loggerError('error en actualizar producciones', e);
      throw e;
    }
  }

  async deleteProduccion(data) {
    try {
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const codProductor = this._cod;
      const lng = this._lng;

      await db.sequelize().transaction(async function (t) {
        let cosechas = [];
        //validaciones
        const year = new Date(data.producciones[0].fechaCaptura).getFullYear();
        const PROD = `TB_COS_Produccion_${year}`;
        await searchOneSchema(PROD, codProductor);

        const codProducciones = data.producciones.map(produccion => produccion.codProduccion);
        //actualizacion de los datos
        await Cosecha(codProductor, PROD, lng).update(
          { codEstado: 2, fechaActualizacion: new Date(), lastModified: dateNumber() },
          { where: { codProduccion: { [Op.in]: codProducciones } } },
          { transaction: t },
        );

        return Promise.all(cosechas)
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

module.exports = CosechaRepository;
