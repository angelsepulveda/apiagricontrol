const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const CampoFormatoCosecha = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'CampoFormatoCosecha',
    {
      codFormatoCosecha: {
        name: 'CodFormatoCosecha',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      codCampo: {
        name: 'CodFormatoCosecha',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
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
      tableName: 'TB_COS_CampoFormatoCosecha',
      sync: { alter: false },
    },
  );
};

module.exports = CampoFormatoCosecha;
