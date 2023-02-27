const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Campo = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Campo',
    {
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
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
      nombreCorto: {
        name: 'NombreCorto',
        type: DataTypes.STRING(5),
        allowNull: true,
        validate: {
          len: {
            args: [0, 5],
            msg: lng('validations.maxLength', { max: 5 }),
          },
        },
      },
      campo: {
        name: 'Campo',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: lng('validations.rangeLength', { min: 1, max: 20 }),
          },
        },
      },
      latitud: {
        name: 'Latitud',
        type: DataTypes.DECIMAL(20, 15),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      longitud: {
        name: 'Longitud',
        type: DataTypes.DECIMAL(20, 15),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      codEmpresa: {
        name: 'CodEmpresa',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codCalendario: {
        name: 'CodCalendario',
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      poligono: {
        name: 'Poligono',
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nombreCortoPoligono: {
        name: 'NombreCortoPoligono',
        type: DataTypes.STRING(5),
        allowNull: true,
        validate: {
          len: {
            args: [0, 5],
            msg: lng('validations.maxLength', { max: 5 }),
          },
        },
      },
      nombrePoligono: {
        name: 'NombrePoligono',
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: lng('validations.maxLength', { max: 50 }),
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
      tableName: 'TB_GRAL_Campo',
      sync: { alter: false },
    },
  );
};

module.exports = Campo;
