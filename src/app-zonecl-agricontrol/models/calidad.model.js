const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Calidad = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Calidad',
    {
      codCalidad: {
        name: 'CodCalidad',
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
      },
      calidad: {
        name: 'Calidad',
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      abreviacion: {
        name: 'Abreviacion',
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
          len: {
            args: [0, 10],
            msg: lng('validations.maxLength', { max: 10 }),
          },
        },
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
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
            msg: lng('validations.numeric'),
          },
        },
      },
      controlSincro: {
        name: 'ControlSincro',
        type: DataTypes.CHAR(36),
        allowNull: true,
        defaultValue: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      timestamps: false,
      tableName: 'TB_COS_Calidad',
      sync: { alter: false },
    },
  );
};

module.exports = Calidad;
