const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const PaisMaster = sequelize.define(
  'Estado',
  {
    codPais: {
      name: 'CodPais',
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    pais: {
      name: 'Pais',
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El campo Pais no puede estar vacío',
        },
        len: {
          args: [1, 45],
          msg: 'El campo Pais debe tener entre 1 y 45 caracteres',
        },
      },
    },
    gentilicio: {
      name: 'Gentilicio',
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El campo Gentilicio no puede estar vacío',
        },
        len: {
          args: [1, 45],
          msg: 'El campo Gentilicio debe tener entre 1 y 45 caracteres',
        },
      },
    },
    nacional: {
      name: 'Nacional',
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    codEstado: {
      name: 'CodEstado',
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'El campo CodEstado debe ser numérico',
        },
      },
    },
    sincro: {
      name: 'Sincro',
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'El campo Sincro debe ser numérico',
        },
      },
    },
    lastModified: {
      name: 'LastModified',
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'El campo LastModified debe ser numérico',
        },
      },
    },
    codEquipo: {
      name: 'CodEquipo',
      type: DataTypes.SMALLINT,
      defaultValue: 0,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'El campo CodEquipo debe ser numérico',
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: 'TB_GRAL_PaisMaster',
    sync: { alter: false },
  },
);

module.exports = PaisMaster;
