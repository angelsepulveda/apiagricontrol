const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const RegionMaster = sequelize.define(
  'RegionMaster',
  {
    codRegion: {
      name: 'CodRegion',
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    codPais: {
      name: 'CodPais',
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nemoTecnico: {
      name: 'NemoTecnico',
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    region: {
      name: 'Region',
      type: DataTypes.STRING(50),
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
    tableName: 'TB_GRAL_RegionMaster',
    sync: { alter: false },
  },
);

module.exports = RegionMaster;
