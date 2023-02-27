const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const UnidadMedida = sequelize.define(
  'UnidadMedida',
  {
    codUnidadMedida: {
      name: 'CodUnidadMedida',
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    unidadMedida: {
      name: 'UnidadMedida',
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    descripcion: {
      name: 'Descripcion',
      type: DataTypes.STRING(45),
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
    },
  },
  {
    timestamps: false,
    tableName: 'TB_COS_UnidadMedida',
    sync: { alter: false },
  },
);

module.exports = UnidadMedida;
