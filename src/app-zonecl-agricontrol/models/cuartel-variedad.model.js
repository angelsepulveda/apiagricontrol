const { DataTypes } = require('sequelize');
const AppZoneAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const CuartelVariedad = (codProductor, lng) => {
  const sequelize = new AppZoneAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'CuartelVariedad',
    {
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codSector: {
        name: 'CodSector',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codCuartel: {
        name: 'CodCuartel',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codVariedad: {
        name: 'CodVariedad',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
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
      haProductivasVar: {
        name: 'HaProductivasVar',
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      numPlantas: {
        name: 'NumPlantas',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: lng('validations.integer'),
          },
        },
      },
      numHileras: {
        name: 'NumHileras',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: lng('validations.integer'),
          },
        },
      },
      diaFrecuenciaMin: {
        name: 'DiaFrecuenciaMin',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      diaFrecuenciaMax: {
        name: 'DiaFrecuenciaMax',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      finalizaCosecha: {
        name: 'FinalizaCosecha',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      codUserUpdate: {
        name: 'CodUserUpdate',
        type: DataTypes.BIGINT,
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
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
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
      tableName: 'TB_GRAL_CuartelVariedad',
      sync: { alter: false },
    },
  );
};

module.exports = CuartelVariedad;
