const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Mutualidad = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Mutualidad',
    {
      codMutualidad: {
        name: 'CodMutualidad',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      mutualidad: {
        name: 'Mutualidad',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: 'El campo Mutualidad debe tener entre 1 y 50 caracteres',
          },
        },
      },
      nemoTecnico: {
        name: 'NemoTecnico',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: 'El campo NemoTecnico debe tener entre 1 y 20 caracteres',
          },
        },
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
      rutPagadoraSubsidio: {
        name: 'RutPagadoraSubsidio',
        type: DataTypes.STRING(12),
        allowNull: true,
        defaultValue: 0,
        validate: {
          len: {
            args: [0, 12],
            msg: 'El campo RutPagadoraSubsidio debe no debe superar los 12 caracteres',
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
      tableName: 'TB_RRHH_Mutualidad',
      sync: { alter: false },
    },
  );
};

module.exports = Mutualidad;
