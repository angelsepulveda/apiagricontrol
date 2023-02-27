const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const TipoEquipo = sequelize.define(
  'TipoEquipo',
  {
    codTipoEquipo: {
      name: 'CodTipoEquipo',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    tipoEquipo: {
      name: 'TipoEquipo',
      type: DataTypes.STRING(30),
      allowNull: true,
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
    tableName: 'TB_GRAL_TipoEquipo',
    sync: { alter: false },
  },
);

module.exports = TipoEquipo;
