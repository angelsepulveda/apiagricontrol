const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');

const sequelize = new AppZonecComunDB().sequelize();
const Productor =
  sequelize.define(
    'Productor',
    {
      codProductor: {
        name: 'CodProductor',
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      dni: {
        name: 'Dni',
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      nombre: {
        name: 'Nombre',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      giro: {
        name: 'Giro',
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      direccion: {
        name: 'Direccion',
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      fono: {
        name: 'Fono',
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      celular: {
        name: 'Celular',
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      correo: {
        name: 'Correo',
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      web: {
        name: 'Web',
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      fechaImplementacion: {
        name: 'FechaImplementacion',
        type: DataTypes.DATE,
        allowNull: true,
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
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'TB_SIS_Productor',
      sync: { alter: false },
    },
  );

module.exports = Productor;
