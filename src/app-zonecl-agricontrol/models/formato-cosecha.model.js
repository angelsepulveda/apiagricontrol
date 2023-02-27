const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const FormatoCosecha = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'FormatoCosecha',
    {
      codFormatoCosecha: {
        name: 'CodFormatoCosecha',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      descripcion: {
        name: 'Descripcion',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
      },
      pesoMinimo: {
        name: 'PesoMinimo',
        type: DataTypes.DECIMAL(11, 4),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      pesoMaximo: {
        name: 'PesoMaximo',
        type: DataTypes.DECIMAL(11, 4),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      validarPeso: {
        name: 'ValidarPeso',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      codTipoRecoleccion: {
        name: 'CodTipoRecoleccion',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codUnidadMedida: {
        name: 'CodUnidadMedida',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      valorPromedio: {
        name: 'ValorPromedio',
        type: DataTypes.DECIMAL(11, 4),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      unidadesAPesar: {
        name: 'UnidadesAPesar',
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
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
      codCalidad: {
        name: 'CodCalidad',
        type: DataTypes.SMALLINT,
        allowNull: false,
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
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'TB_COS_FormatoCosecha',
      sync: { alter: false },
    },
  );
};

module.exports = FormatoCosecha;
