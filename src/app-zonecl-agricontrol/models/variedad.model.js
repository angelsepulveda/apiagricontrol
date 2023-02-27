const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const VariedadModel = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Variedad',
    {
      codVariedad: {
        name: 'CodVariedad',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      codEspecie: {
        name: 'CodEspecie',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
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
            msg: lng('validations.rangeLength', { min: 1, max: 20 }),
          },
        },
      },
      variedad: {
        name: 'Variedad',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
      },
      nombreCorto: {
        name: 'NombreCorto',
        type: DataTypes.STRING(3),
        allowNull: true,
        validate: {
          len: {
            args: [0, 3],
            msg: lng('validations.rangeLength', { min: 1, max: 3 }),
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
      tableName: 'TB_GRAL_Variedad',
      sync: { alter: false },
    },
  );
};

module.exports = VariedadModel;
