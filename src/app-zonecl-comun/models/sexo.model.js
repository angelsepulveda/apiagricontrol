const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Sexo = sequelize.define(
  'Sexo',
  {
    codSexo: {
      name: 'CodSexo',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    nemoTecnico: {
      name: 'NemoTecnico',
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    sexo: {
      name: 'Sexo',
      type: DataTypes.STRING(10),
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
    tableName: 'TB_GRAL_Sexo',
    sync: { alter: false },
  },
);

module.exports = Sexo;
