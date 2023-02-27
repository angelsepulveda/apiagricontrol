const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Moneda = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Moneda',
    {
      codMoneda: {
        name: 'CodMoneda',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      moneda: {
        name: 'Moneda',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: 'El campo Moneda debe tener entre 1 y 30 caracteres',
          },
        },
      },
      descripcion: {
        name: 'Descripcion',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: 'El campo Descripcion debe tener entre 1 y 50 caracteres',
          },
        },
      },
      planSalud: {
        name: 'PlanSalud',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      codigoPrevired: {
        name: 'CodigoPrevired',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
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
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        validate: {
          isNumeric: {
            msg: 'El campo CodEquipo debe ser numérico',
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
      tableName: 'TB_RRHH_Moneda',
      sync: { alter: false },
    },
  );
};

module.exports = Moneda;
