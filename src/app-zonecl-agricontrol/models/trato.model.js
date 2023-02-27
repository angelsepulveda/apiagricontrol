const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Trato = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Trato',
    {
      codTrato: {
        name: 'CodTrato',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
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
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      trato: {
        name: 'Trato',
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: lng('validations.rangeLength', { min: 1, max: 30 }),
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
      tableName: 'TB_COS_Trato',
      sync: { alter: false },
    },
  );
};

module.exports = Trato;
