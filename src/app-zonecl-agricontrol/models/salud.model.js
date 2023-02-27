const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Salud = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Salud',
    {
      codSalud: {
        name: 'CodSalud',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      salud: {
        name: 'Salud',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
      },
      nemoTecnico: {
        name: 'NemoTecnico',
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
          },
        },
      },
      valorPactado: {
        name: 'ValorPactado',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo valorPactado debe ser un numero',
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
      rutPagadoraSubsidio: {
        name: 'RutPagadoraSubsidio',
        type: DataTypes.DECIMAL(11, 1),
        allowNull: true,
        defaultValue: 0,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      dvPagadoraSubsidio: {
        name: 'DvPagadoraSubsidio',
        type: DataTypes.CHAR(1),
        AllowNull: true,
        defaultValue: '0',
        validate: {
          len: {
            args: [1, 1],
            msg: lng('validations.maxLength', { max: 1 }),
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
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
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
      tableName: 'TB_RRHH_Salud',
      sync: { alter: false },
    },
  );
};

module.exports = Salud;
