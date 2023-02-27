const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Sector = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Sector',
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
      sector: {
        name: 'Sector',
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [0, 50],
            msg: lng('validations.maxLength', { max: 50 }),
          },
        },
      },
      poligono: {
        name: 'Poligono',
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: 'TB_GRAL_Sector',
      sync: { alter: false },
    },
  );
};

module.exports = Sector;
