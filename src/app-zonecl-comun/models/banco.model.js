const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Banco =
  sequelize.define(
    'Banco',
    {
      codBanco: {
        name: 'CodBanco',
        type: DataTypes.SMALLINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: 'El código del banco debe ser numérico',
          },
        },
      },
      banco: {
        name: 'Banco',
        type: DataTypes.STRING(30),
        validate: {
          len: {
            args: [1, 30],
            msg: 'El nombre del banco debe tener entre 1 y 30 caracteres',
          },
        },
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: 'El código del estado debe ser numérico',
          },
        },
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
      freezeTableName: true,
      timestamps: false,
      tableName: 'TB_GRAL_Banco',
      sync: { alter: false },
    },
  );

module.exports = Banco;
