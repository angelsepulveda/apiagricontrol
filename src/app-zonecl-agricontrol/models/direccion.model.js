const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Direccion = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Direccion',
    {
      codDireccion: {
        name: 'CodDireccion',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      codEntidad: {
        name: 'CodEntidad',
        type: DataTypes.STRING(20),
        primaryKey: true,
        validate: {
          len: {
            args: [1, 20],
            msg: lng('validations.rangeLength', { min: 1, max: 20 }),
          },
        },
      },
      codTablaEntidad: {
        name: 'CodTablaEntidad',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      calle: {
        name: 'Calle',
        type: DataTypes.STRING(150),
        allowNull: true,
        validate: {
          len: {
            args: [0, 150],
            msg: lng('validations.maxLength', { max: 150 }),
          },
        },
      },
      numero: {
        name: 'Numero',
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: lng('validations.maxLength', { max: 50 }),
          },
        },
      },
      apartamento: {
        name: 'Apartamento',
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: lng('validations.maxLength', { max: 50 }),
          },
        },
      },
      informacionAdicional: {
        name: 'InformacionAdicional',
        type: DataTypes.STRING(120),
        allowNull: true,
        validate: {
          len: {
            args: [0, 120],
            msg: lng('validations.maxLength', { max: 120 }),
          },
        },
      },
      codigoPostal: {
        name: 'CodigoPostal',
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
          },
        },
      },
      codPais: {
        name: 'CodPais',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codRegion: {
        name: 'CodRegion',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codComuna: {
        name: 'CodComuna',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      ciudad: {
        name: 'Ciudad',
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          len: {
            args: [0, 100],
            msg: lng('validations.maxLength', { max: 100 }),
          },
        },
      },
      predeterminada: {
        name: 'Predeterminada',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
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
      tableName: 'TB_GRAL_Direccion',
      sync: { alter: false },
    },
  );
};

module.exports = Direccion;
