const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Contratista = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Contratista',
    {
      codContratista: {
        name: 'CodContratista',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      dni: {
        name: 'Dni',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: lng('validations.rangeLength', { min: 1, max: 20 }),
          },
        },
      },
      nombre: {
        name: 'Nombre',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
      },
      giro: {
        name: 'Giro',
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: lng('validations.maxLength', { max: 50 }),
          },
        },
      },
      fono: {
        name: 'Fono',
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
          len: {
            args: [0, 15],
            msg: lng('validations.maxLength', { max: 15 }),
          },
        },
      },
      celular: {
        name: 'Celular',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      email: {
        name: 'Email',
        type: DataTypes.STRING(25),
        allowNull: true,
        validate: {
          len: {
            args: [0, 25],
            msg: lng('validations.maxLength', { max: 25 }),
          },
        },
      },
      web: {
        name: 'Web',
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [0, 30],
            msg: lng('validations.maxLength', { max: 30 }),
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
        allowNull: true,
        defaultValue: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      timestamps: false,
      tableName: 'TB_COS_Contratista',
      sync: { alter: false },
    },
  );
};

module.exports = Contratista;
