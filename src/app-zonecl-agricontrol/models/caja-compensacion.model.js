const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const CajaCompensacion = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'CajaCompensacion',
    {
      codCajaCompensacion: {
        name: 'CodCajaCompensacion',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      nemoTecnico: {
        name: 'NemoTecnico',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: lng('validations.rangeLength', { min: 1, max: 20 }),
          },
        },
      },
      cajaCompensacion: {
        name: 'CajaCompensacion',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
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
        defaultValue: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      timestamps: false,
      tableName: 'TB_RRHH_CajaCompensacion',
      sync: { alter: false },
    },
  );
};

module.exports = CajaCompensacion;
