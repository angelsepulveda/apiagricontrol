const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const TrabajadorCargaFamiliar = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'TrabajadorCargaFamiliar',
    {
      codTrabajadorCargaFamiliar: {
        name: 'CodTrabajadorCargarFamiliar',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      codTrabajador: {
        name: 'CodTrabajador',
        type: DataTypes.STRING(20),
        primaryKey: true,
        validate: {
          len: {
            args: [1, 20],
            msg: 'El campo CodTrabajador debe tener entre 1 y 20 caracteres.',
          },
        },
      },
      nombre: {
        name: 'Nombre',
        type: DataTypes.STRING(120),
        allowNull: true,
        validate: {
          len: {
            args: [0, 120],
            msg: 'El campo Nombre debe tener entre 0 y 120 caracteres.',
          },
        },
      },
      fechaNacimiento: {
        name: 'FechaNacimiento',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'El campo FechaNacimiento debe ser una fecha válida.',
          },
        },
      },
      codSexo: {
        name: 'CodSexo',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodSexo debe ser un número.',
          },
        },
      },
      codTipoCargaFamiliar: {
        name: 'CodTipoCargaFamiliar',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodTipoCargaFamiliar debe ser un número.',
          },
        },
      },
      codRelacionFamiliar: {
        name: 'CodRelacionFamiliar',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodRelacionFamiliar debe ser un número.',
          },
        },
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodEstado debe ser un número.',
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo Sincro debe ser un número.',
          },
        },
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo LastModified debe ser un número.',
          },
        },
      },
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        validate: {
          isNumeric: {
            msg: 'El campo CodEquipo debe ser un número.',
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
      tableName: 'TB_RRHH_TrabajadorCargaFamiliar',
      sync: { alter: false },
    },
  );
};

module.exports = TrabajadorCargaFamiliar;
