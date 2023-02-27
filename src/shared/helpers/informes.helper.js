const AppZoneAgriControlDB = require('../database/connection/app-zonec-agricontrol');
const { NotFoundException } = require('../exceptions');

const cosechaFromTables = async (fechaDesde, fechaHasta, codProductor) => {
  const desde = new Date(fechaDesde);
  const hasta = new Date(fechaHasta);
  let years = [];
  for (let i = desde.getFullYear(); i <= hasta.getFullYear(); i++) {
    years.push(i);
  }
  let from = '(';

  const schemas = await searchSchema(years, codProductor);
  schemas.forEach((year, index) => {
    if (index === 0) {
      from += `SELECT * FROM TB_COS_Produccion_${year} `;
    } else {
      from += `UNION SELECT * FROM TB_COS_Produccion_${year} `;
    }
  });
  from += ')';
  if (from === '()') throw new NotFoundException('No hay datos para ese año');
  return from;
};

const searchSchema = async (years, codProductor) => {
  const db = new AppZoneAgriControlDB({ codProductor: codProductor });
  const sql =
    'SELECT RIGHT(TABLE_NAME,4) AS PROD FROM information_schema.TABLES WHERE TABLES.TABLE_NAME LIKE \'%TB_COS_Produccion%\'';

  const [results] = await db.sequelize().query(sql);

  return years.filter(year => {
    return results.find(result => {
      return result.PROD === year.toString();
    });
  });
};

const searchOneSchema = async (schema, codProductor) => {
  const db = new AppZoneAgriControlDB({ codProductor: codProductor });

  const where = `WHERE TABLES.TABLE_NAME LIKE '%${schema}%'`;
  const sql = `SELECT TABLE_NAME AS PROD FROM information_schema.TABLES ${where}`;

  const [results] = await db.sequelize().query(sql);

  if (results.length <= 0) throw new NotFoundException('No hay datos para esta fecha');
};

module.exports = { cosechaFromTables, searchOneSchema };
