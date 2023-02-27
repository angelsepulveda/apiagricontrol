const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Trabajador = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Trabajador',
    {
      codTrabajador: {
        name: 'CodTrabajador',
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      nemoTecnico: {
        name: 'nemoTecnico',
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
          },
        },
      },
      nombres: {
        name: 'Nombres',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      primerApellido: {
        name: 'PrimerApellido',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      segundoApellido: {
        name: 'SegundoApellido',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      nombreSocial: {
        name: 'NombreSocial',
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      fechaNacimiento: {
        name: 'FechaNacimiento',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      codSexo: {
        name: 'CodSexo',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      telefono1: {
        name: 'Telefono1',
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          len: {
            args: [0, 15],
            msg: lng('validations.maxLength', { max: 15 }),
          },
        },
      },
      telefono2: {
        name: 'Telefono2',
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          len: {
            args: [0, 15],
            msg: lng('validations.maxLength', { max: 15 }),
          },
        },
      },
      email: {
        name: 'Email',
        type: DataTypes.STRING(120),
        allowNull: true,
        validate: {
          len: {
            args: [0, 120],
            msg: lng('validations.maxLength', { max: 120 }),
          },
        },
      },
      codEstadoCivil: {
        name: 'CodEstadoCivil',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codPais: {
        name: 'CodPais',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codGrupoBins: {
        name: 'CodGrupoBins',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codContratista: {
        name: 'CodContratista',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codCuadrilla: {
        name: 'CodCuadrilla',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codPension: {
        name: 'CodPension',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codPrevision: {
        name: 'CodPrevision',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      apv: {
        name: 'APV',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      codUnidadAPV: {
        name: 'CodUnidadAPV',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      cuenta2: {
        name: 'Cuenta2',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      codUnidadCuenta2: {
        name: 'CodUnidadCuenta2',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codSalud: {
        name: 'CodSalud',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      planSalud: {
        name: 'PlanSalud',
        type: DataTypes.DECIMAL(20, 5),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      codUnidadPlanSalud: {
        name: 'CodUnidadPlanSalud',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codFormaPago: {
        name: 'CodFormaPago',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codBanco: {
        name: 'CodBanco',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codTipoCuenta: {
        name: 'CodTipoCuenta',
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          len: {
            args: [0, 15],
            msg: lng('validations.maxLength', { max: 15 }),
          },
        },
      },
      numeroCuenta: {
        name: 'NumeroCuenta',
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
          },
        },
      },
      codUserUpdate: {
        name: 'CodUserUpdate',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codAsignacionFamiliar: {
        name: 'CodAsignacionFamiliar',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codObjetado: {
        name: 'CodObjetado',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      fechaCreacion: {
        name: 'FechaCreacion',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      fechaActualizacion: {
        name: 'FechaActualizacion',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: lng('validations.date'),
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
      tableName: 'TB_RRHH_Trabajador',
      sync: { alter: false },
    },
  );
};

module.exports = Trabajador;
