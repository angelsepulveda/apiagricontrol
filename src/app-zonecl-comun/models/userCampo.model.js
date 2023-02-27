const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const UserCampo = sequelize.define(
  'UserCampo',
  {
    userId: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codCampo: {
      name: 'CodCampo',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: 'TB_WEB_UserCampo',
    sync: { alter: false },
  },
);

module.exports = UserCampo;
