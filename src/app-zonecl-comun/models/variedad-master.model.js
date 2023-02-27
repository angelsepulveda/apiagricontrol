const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const VariedadMaster = sequelize.define(
  'VariedadMaster',
  {
    codVariedad: {
      name: 'CodVariedad',
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    codEspecie: {
      name: 'CodEspecie',
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nemoTecnico: {
      name: 'NemoTecnico',
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    variedad: {
      name: 'Variedad',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombreCorto: {
      name: 'NombreCorto',
      type: DataTypes.STRING(3),
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
    tableName: 'TB_GRAL_VariedadMaster',
    sync: { alter: false },
  },
);

module.exports = VariedadMaster;
