const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const Hilera = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Hilera',
    {
      codCampo: {
        name: 'CodCampo',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: 'CodCampo debe ser un número',
          },
        },
      },
      codSector: {
        name: 'CodSector',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: 'CodSector debe ser un número',
          },
        },
      },
      codCuartel: {
        name: 'CodCuartel',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: 'CodCuartel debe ser un número',
          },
        },
      },
      codVariedad: {
        name: 'CodVariedad',
        type: DataTypes.BIGINT,
        primaryKey: true,
        validate: {
          isNumeric: {
            msg: 'CodVariedad debe ser un número',
          },
        },
      },
      codHilera: {
        name: 'CodHilera',
        primaryKey: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'LastModified debe ser un número',
          },
        },
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'CodEstado debe ser un número',
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'Sincro debe ser un número',
          },
        },
      },
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        validate: {
          isNumeric: {
            msg: 'CodEquipo debe ser un número',
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
      tableName: 'TB_GRAL_Hilera',
      sync: { alter: false },
    },
  );
};

module.exports = Hilera;
