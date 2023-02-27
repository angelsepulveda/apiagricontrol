const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Cuartel = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Cuartel',
    {
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codSector: {
        name: 'CodSector',
        type: DataTypes.BIGINT,
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
      cuartel: {
        name: 'Cuartel',
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
      },
      anioPlantacion: {
        name: 'AnioPlantacion',
        type: DataTypes.NUMBER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      superficie: {
        name: 'Superficie',
        type: DataTypes.DECIMAL(11, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      codTipoCobertura: {
        name: 'CodTipoCobertura',
        type: DataTypes.NUMBER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      organico: {
        name: 'Organico',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      productivo: {
        name: 'Productivo',
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
      entreHilera: {
        name: 'EntreHilera',
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      sobreHilera: {
        name: 'SobreHilera',
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        validate: {
          isDecimal: {
            msg: lng('validations.decimal'),
          },
        },
      },
      numPlantasPorHa: {
        name: 'NumPlantasPorHa',
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      codClasificacionDensidad: {
        name: 'CodClasificacionDensidad',
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
        type: DataTypes.NUMBER,
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
      freezeTableName: true,
      tableName: 'TB_GRAL_Cuartel',
      sync: { alter: false },
    },
  );
};

module.exports = Cuartel;
