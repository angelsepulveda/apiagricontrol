const AppZoneAgriControlDB = require('../../database/connection/app-zonec-agricontrol');
const { formatDate } = require('../../helpers/date.helper');
const { searchOneSchema } = require('../../helpers/informes.helper');

class CosechaGraficosRepository {
  constructor({ codProductor, lng }) {
    this._cod = codProductor;
    this._lng = lng;
  }

  async searchCamposCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          ES.CodEspecie as codEspecie,
                          PROD.CodCampo as codCampo,
                          U.UnidadMedida as unidadMedida,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodCampo`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchTrabajadoresCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          Prod.CodProduccion as id,
                          CONCAT(CAST(SUM(PROD.Valor) AS CHAR), ' ' ,U.UnidadMedida) as kilos,
                          C.Campo as campo,
                          CONCAT(t.Nombres, ' ', t.PrimerApellido, ' ', t.SegundoApellido) as trabajador
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                          left join TB_RRHH_Trabajador t on PROD.CodTrabajador = t.CodTrabajador
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodTrabajador`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchSectoresCosechas({ fecha, campo, especie }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampo = campo !== '0' || campo !== null ? `and PROD.CodCampo = ${campo}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          PROD.CodSector as codSector,
                          ES.Especie as especie,
                          ES.CodEspecie as codEspecie,
                          PROD.CodCampo as codCampo,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereEspecie}
                     ${whereCampo}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodSector`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchCuartelesCosechas({ fecha, sector, especie }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereSector = sector !== '0' || campo !== null ? `and PROD.CodSector = ${sector}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          ES.CodEspecie as codEspecie,
                          PROD.CodCampo as codCampo,
						              PROD.CodSector as codSector,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on PROD.CodCuartel = CU.CodCuartel
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereEspecie}
                     ${whereSector}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodCuartel`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchVaridadesSectoresCosechas({ fecha, campo, variedad }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereVariedad = variedad !== '0' || variedad !== null ? `and PROD.CodVariedad = ${variedad}` : '';
      const whereCampo = campo !== '0' || campo !== null ? `and PROD.CodCampo = ${campo}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          ES.CodEspecie as codEspecie,
                          PROD.CodSector as codSector,
                          PROD.CodCampo as codCampo,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereVariedad}
                     ${whereCampo}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodSector`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchVaridadesCuartelesCosechas({ fecha, sector, variedad }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereVariedad = variedad !== '0' || variedad !== null ? `and PROD.CodVariedad = ${variedad}` : '';
      const whereSector = sector !== '0' || sector !== null ? `and PROD.CodSector = ${sector}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          ES.CodEspecie as codEspecie,
                          PROD.CodCampo as codCampo,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on PROD.CodCuartel = CU.CodCuartel
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereVariedad}
                     ${whereSector}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodCuartel`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchVariedadesCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          PROD.CodCampo as codCampo,
                          ES.Especie as especie,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_COS_FormatoCosecha F on F.CodFormatoCosecha = PROD.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY V.Variedad`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async graficoFormatoCosechas({ fecha, campo = null, sector = null, formatoCosecha }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereFormatoCosecha =
        formatoCosecha !== '0' || formatoCosecha !== null ? `and PROD.CodFormatoCosecha = ${formatoCosecha}` : '';

      const whereCampo = campo !== null ? `and PROD.CodCampo = ${campo}` : '';
      const whereSector = sector !== null ? `and PROD.CodSector = ${sector}` : '';

      const groupByFormatoCosecha =
        formatoCosecha !== null && campo === null && sector === null ? 'GROUP BY PROD.CodCampo' : '';

      const groupBySector = formatoCosecha !== null && campo !== null ? 'GROUP BY PROD.CodSector' : '';

      const groupByCuartel = formatoCosecha !== null && sector !== null ? 'GROUP BY PROD.CodCuartel' : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          PROD.CodCampo as codCampo,
                          PROD.CodSector as codSector,
                          PROD.CodCuartel as codCuartel,
                          F.Descripcion as descripcion,
                          PROD.CodFormatoCosecha as codFormatoCosecha,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          CUA.Cuadrilla AS cuadrilla,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on PROD.CodCuartel = CU.CodCuartel
                          left join TB_GRAL_Cuadrilla CUA on PROD.CodCuadrilla = CUA.CodCuadrilla
                          left join TB_COS_FormatoCosecha F on PROD.CodFormatoCosecha = F.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereFormatoCosecha}
                     ${whereCampo}
                     ${whereSector}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     ${groupByFormatoCosecha}
                     ${groupBySector}
                     ${groupByCuartel}`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchCuadrillasCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          CUA.Cuadrilla AS cuadrilla,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on S.CodSector = CU.CodSector
                          left join TB_GRAL_Cuadrilla CUA on PROD.CodCuadrilla = CUA.CodCuadrilla
                          left join TB_COS_FormatoCosecha F on PROD.CodFormatoCosecha = F.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodCuadrilla`;
      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchContratistasCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          ES.Especie as especie,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          PROD.CodVariedad as codVariedad,
                          CON.Nombre AS contratista,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on PROD.CodSector = CU.CodSector
                          left join TB_GRAL_Cuadrilla CUA on PROD.CodCuadrilla = CUA.CodCuadrilla
                          left join TB_COS_Contratista CON on PROD.CodContratista = CON.CodContratista
                          left join TB_COS_FormatoCosecha F on PROD.CodFormatoCosecha = F.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodContratista`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchCamposVariedadesCosechas({ fecha, variedad, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereVariedad = variedad !== '0' || variedad !== null ? `and PROD.CodVariedad = ${variedad}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
						  PROD.CodSector as codSector,
                          PROD.CodVariedad as codVariedad,
                          V.Variedad as variedad,
						  PROD.CodCampo as codCampo,
                          SUM(PROD.Valor) AS kilos,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
						left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
						left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
						left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
						left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
						left join TB_GRAL_Cuartel CU on PROD.CodCuartel = CU.CodCuartel
						left join TB_GRAL_Cuadrilla CUA on PROD.CodCuadrilla = CUA.CodCuadrilla
            left join TB_COS_FormatoCosecha F on PROD.CodFormatoCosecha = F.CodFormatoCosecha
            left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereVariedad}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodCampo`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }

  async searchFormatoCosechas({ fecha, especie, campos }) {
    try {
      /* asignamos a que base datos debe conectar */
      const db = new AppZoneAgriControlDB({ codProductor: this._cod });

      const bins = 0;

      const date = formatDate(new Date(fecha));
      const year = new Date(fecha).getFullYear();
      const PROD = `TB_COS_Produccion_${year}`;

      //validación si existe la tabla
      await searchOneSchema(PROD, this._cod);

      const whereEspecie = especie !== '0' || especie !== null ? `and ES.CodEspecie = ${especie}` : '';
      const whereCampos = campos.length > 0 ? `and PROD.CodCampo in (${campos})` : '';

      const sql = `select
                          PROD.Valor AS kilos,
                          C.Campo as campo,
                          V.Variedad as variedad,
                          PROD.CodCampo as codCampo,
                          S.Sector as sector,
                          CU.Cuartel as cuartel,
                          F.Descripcion as descripcion,
                          PROD.CodVariedad as codVariedad,
                          SUM(PROD.Valor) AS kilos,
                          PROD.CodFormatoCosecha as codFormatoCosecha,
                          U.UnidadMedida as unidadMedida
                   from ${PROD} as PROD
                          left join TB_GRAL_Campo C on PROD.CodCampo = C.CodCampo
                          left join TB_GRAL_Variedad V on V.CodVariedad = PROD.CodVariedad
                          left join TB_GRAL_Especie ES on V.CodEspecie = ES.CodEspecie
                          left join TB_GRAL_Sector S on C.CodCampo = S.CodCampo
                          left join TB_GRAL_Cuartel CU on PROD.CodCuartel = CU.CodCuartel
                          left join TB_COS_FormatoCosecha F on PROD.CodFormatoCosecha = F.CodFormatoCosecha
                          left join appzonec_comun.TB_COS_UnidadMedida U on F.CodUnidadMedida = U.CodUnidadMedida
                   where PROD.CodEstado = 1
                     and PROD.Bins = ${bins}
                     ${whereCampos}
                     ${whereEspecie}
                     and PROD.FechaCaptura between '${date} 00:00:00' AND '${date} 23:59:59'
                     GROUP BY PROD.CodFormatoCosecha`;

      const [results] = await db.sequelize().query(sql);

      return results;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CosechaGraficosRepository;
