const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Funcionalidad =
  sequelize.define(
    'Funcionalidad',
    {
      codFuncionalidad: {
        name: 'CodFuncionalidad',
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
      },
      funcionalidad: {
        name: 'Funcionalidad',
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'TB_SIS_Funcionalidad',
      sync: { alter: false },
    },
  );

module.exports = Funcionalidad;
