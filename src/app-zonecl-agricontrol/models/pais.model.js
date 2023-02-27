const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Pais = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Pais',
    {
      codPais: {
        name: 'CodPais',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numerico'),
          },
        },
      },
      pais: {
        name: 'Pais',
        type: DataTypes.STRING(45),
        validate: {
          len: {
            args: [1, 45],
            msg: lng('validations.maxLength', { max: 45 }),
          },
        },
      },
      gentilicio: {
        name: 'Gentilicio',
        type: DataTypes.STRING(45),
        validate: {
          len: {
            args: [0, 45],
            msg: lng('validations.maxLength', { max: 45 }),
          },
        },
      },
      nacional: {
        name: 'Nacional',
        type: DataTypes.BOOLEAN,
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numerico'),
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numerico'),
          },
        },
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numerico'),
          },
        },
      },
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        validate: {
          isNumeric: {
            msg: lng('validations.numerico'),
          },
        },
      },
      controlSincro: {
        name: 'ControlSincro',
        type: DataTypes.CHAR(36),
        defaultValue: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      timestamps: false,
      tableName: 'TB_GRAL_Pais',
      sync: { alter: false },
    },
  );
};

module.exports = Pais;
