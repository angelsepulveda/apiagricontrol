const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Produccion = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Produccion',
    {
      codProduccion: {
        name: 'CodProduccion',
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      codCuadrilla: {
        name: 'CodCuadrilla',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodCuadrilla debe ser numérico',
          },
        },
      },
      codJefeCuadrilla: {
        name: 'CodJefeCuadrilla',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodJefeCuadrilla debe ser numérico',
          },
        },
      },
      codTrabajador: {
        name: 'CodTrabajador',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: 'El campo CodTrabajador debe tener entre 1 y 20 caracteres',
          },
        },
      },
      codContratista: {
        name: 'CodContratista',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodContratista debe ser numérico',
          },
        },
      },
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodCampo debe ser numérico',
          },
        },
      },
      codSector: {
        name: 'CodSector',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodSector debe ser numérico',
          },
        },
      },
      codCuartel: {
        name: 'CodCuartel',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodCuartel debe ser numérico',
          },
        },
      },
      codVariedad: {
        name: 'CodVariedad',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodVariedad debe ser numérico',
          },
        },
      },
      fechaCaptura: {
        name: 'FechaCaptura',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'La fecha de creación debe ser una fecha válida',
          },
        },
      },
      fechaServer: {
        name: 'FechaServer',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'La fecha de creación debe ser una fecha válida',
          },
        },
      },
      codEquipoCaptura: {
        name: 'CodEquipoCaptura',
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          len: {
            args: [1, 20],
            msg: 'El campo CodEquipoCaptura debe tener entre 1 y 20 caracteres',
          },
        },
      },
      codUnidadMedida: {
        name: 'CodUnidadMedida',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodUnidadMedida debe ser numérico',
          },
        },
      },
      valor: {
        name: 'Valor',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'el Valor debe ser un número decimal',
          },
        },
      },
      valorPromedio: {
        name: 'ValorPromedio',
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'el  ValorPromedio debe ser un número decimal',
          },
        },
      },
      pesadoHuerto: {
        name: 'PesadoHuerto',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      codFormatoCosecha: {
        name: 'CodFormatoCosecha',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodFormatoCosecha debe ser numérico',
          },
        },
      },
      trato: {
        name: 'Trato',
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [0, 20],
            msg: 'El campo Trato debe tener entre 0 y 20 caracteres',
          },
        },
      },
      fechaInsercion: {
        name: 'FechaInsercion',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'La fecha de creación debe ser una fecha válida',
          },
        },
      },
      folioPalet: {
        name: 'FolioPalet',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo FolioPalet debe ser numérico',
          },
        },
      },
      bins: {
        name: 'Bins',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      codBins: {
        name: 'CodBins',
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      codGrupoBins: {
        name: 'CodGrupoBins',
        type: DataTypes.SMALLINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'El campo CodGrupoBins debe ser numérico',
          },
        },
      },
      codQR: {
        name: 'CodQR',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El campo CodQR debe ser numérico',
          },
        },
      },
      latitud: {
        name: 'Latitud',
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: 'Latitud debe ser un número decimal',
          },
        },
      },
      longitud: {
        name: 'Longitud',
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: 'longitud debe ser un número decimal',
          },
        },
      },
      codUserUpdate: {
        name: 'CodUserUpdate',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'El CodUserUpdate debe ser un número decimal',
          },
        },
      },
      fechaCreacion: {
        name: 'FechaCreacion',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'La fecha de creación debe ser una fecha válida',
          },
        },
      },
      fechaActualizacion: {
        name: 'FechaActualizacion',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'La fecha de actualización debe ser una fecha válida',
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
      tableName: 'TB_COS_Produccion_2022',
      sync: { alter: false },
    },
  );
};

module.exports = Produccion;
