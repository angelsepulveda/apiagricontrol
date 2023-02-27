const DataTypes = require('sequelize');
const AppAgriControlDB = require('../../database/connection/app-zonec-agricontrol');

const Cosecha = (codProductor, tableName, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Cosecha',
    {
      codProduccion: {
        name: 'CodProduccion',
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      codCuadrilla: {
        name: 'CodCuadrilla',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codJefeCuadrilla: {
        name: 'CodJefeCuadrilla',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codTrabajador: {
        name: 'CodTrabajador',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
          },
        },
      },
      codContratista: {
        name: 'CodContratista',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codSector: {
        name: 'CodSector',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codCuartel: {
        name: 'CodCuartel',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codVariedad: {
        name: 'CodVariedad',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      fechaCaptura: {
        name: 'FechaCaptura',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      fechaServer: {
        name: 'FechaServer',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      codEquipoCaptura: {
        name: 'CodEquipoCaptura',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
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
      valor: {
        name: 'Valor',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      valorPromedio: {
        name: 'ValorPromedio',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codFormatoCosecha: {
        name: 'CodFormatoCosecha',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      valor: {
        name: 'Valor',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.numeric'),
          },
        },
      },
      pesadoHuerto: {
        name: 'PesadoHuerto',
        type: DataTypes.TINYINT(3),
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      trato: {
        name: 'trato',
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          len: {
            args: [0, 20],
            msg: lng('validations.maxLength', { max: 20 }),
          },
        },
      },
      fechaInsercion: {
        name: 'FechaInsercion',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      folioPalet: {
        name: 'folioPalet',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      bins: {
        name: 'Bins',
        type: DataTypes.TINYINT(3),
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codBins: {
        name: 'CodBins',
        type: DataTypes.CHAR(36),
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codQR: {
        name: 'CodQR',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codGrupoBins: {
        name: 'CodGrupoBins',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      latitud: {
        name: 'Latitud',
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      longitud: {
        name: 'longitud',
        type: DataTypes.DECIMAL(10, 7),
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
            msg: {
              msg: lng('validations.date'),
            },
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
      tableName: tableName,
      sync: { alter: false },
    },
  );
};

module.exports = Cosecha;
