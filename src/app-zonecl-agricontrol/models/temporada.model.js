const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Temporada = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Temporada',
    {
      codTemporada: {
        name: 'CodTemporada',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      codEspecie: {
        name: 'CodEspecie',
        type: DataTypes.BIGINT,
        //primaryKey: true,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      inicio: {
        name: 'Inicio',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      termino: {
        name: 'Termino',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: lng('validations.date'),
          },
        },
      },
      temporada: {
        name: 'Temporada',
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          len: {
            args: [1, 10],
            msg: lng('validations.rangeLength', { min: 1, max: 10 }),
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
      tableName: 'TB_GRAL_Temporada',
      sync: { alter: false },
    },
  );
};

module.exports = Temporada;
