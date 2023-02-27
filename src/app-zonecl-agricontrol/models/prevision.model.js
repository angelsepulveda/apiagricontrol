const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Prevision = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Prevision',
    {
      codPrevision: {
        name: 'CodPrevision',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      nemoTecnico: {
        name: 'NemoTecnico',
        type: DataTypes.STRING(20),
        validate: {
          len: {
            args: [0, 20],
          },
        },
      },
      afp: {
        name: 'Afp',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [0, 50],
            msg: 'El campo Afp debe tener entre 0 y 50 caracteres',
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
      tableName: 'TB_RRHH_Prevision',
      sync: { alter: false },
    },
  );
};

module.exports = Prevision;
