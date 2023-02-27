const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Estado = sequelize.define(
  'Estado',
  {
    codEstado: {
      name: 'CodEstado',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    estado: {
      name: 'Estado',
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    visible: {
      name: 'visible',
      type: DataTypes.BOOLEAN,
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
    tableName: 'TB_GRAL_Estado',
    sync: { alter: false },
  },
);

module.exports = Estado;
