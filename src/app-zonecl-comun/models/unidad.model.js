const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Unidad = sequelize.define(
  'Unidad',
  {
    codUnidad: {
      name: 'CodUnidad',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    unidad: {
      name: 'Unidad',
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    descripcion: {
      name: 'Descripcion',
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    prevision: {
      name: 'Prevision',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    planSalud: {
      name: 'PlanSalud',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    apv: {
      name: 'Apv',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cuenta2: {
      name: 'Cuenta2',
      type: DataTypes.BOOLEAN,
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
    tableName: 'TB_RRHH_Unidad',
    sync: { alter: false },
  },
);

module.exports = Unidad;
