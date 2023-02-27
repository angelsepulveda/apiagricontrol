const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const TipoCargaFamiliar = sequelize.define(
  'TipoCargaFamiliar',
  {
    codTipoCargaFamiliar: {
      name: 'CodTipoCargaFamiliar',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    tipoCargaFamiliar: {
      name: 'TipoCargaFamiliar',
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
    tableName: 'TB_RRHH_TipoCargaFamiliar',
    sync: { alter: false },
  },
);

module.exports = TipoCargaFamiliar;
