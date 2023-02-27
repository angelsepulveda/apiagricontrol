const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const TipoRecoleccion = codProductor => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'TipoRecoleccion',
    {
      codTipoRecoleccion: {
        name: 'CodTipoRecoleccion',
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
      },
      nemoTecnico: {
        name: 'NemoTecnico',
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      tipoRecoleccion: {
        name: 'TipoRecoleccion',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      codEquipo: {
        name: 'CodEquipo',
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
      controlSincro: {
        name: 'ControlSincro',
        type: DataTypes.CHAR(36),
        defaultValue: '00000000-0000-0000-0000-000000000000',
      },
    },
    {
      timestamps: false,
      tableName: 'TB_COS_TipoRecoleccion',
      sync: { alter: false },
    },
  );
};

module.exports = TipoRecoleccion;
