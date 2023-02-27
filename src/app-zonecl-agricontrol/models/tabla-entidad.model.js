const { DataTypes } = require('sequelize');
const AppAgriControlDB = require('../../shared/database/connection/app-zonec-agricontrol');

const TablaEntidad = (codProductor, lng) => {
  const sequelize = new AppAgriControlDB({ codProductor: codProductor }).sequelize();
  return sequelize.define(
    'Entidad',
    {
      codComuna: {
        name: 'CodTablaEntidad',
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      tabla: {
        name: 'Tabla',
        type: DataTypes.STRING(50),
        validate: {
          len: {
            args: [1, 50],
            msg: lng('validations.rangeLength', { min: 1, max: 50 }),
          },
        },
        nullable: false,
      },
      codModulo: {
        name: 'CodModulo',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      ordenTablaSistema: {
        name: 'OrdenTablaSistema',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      prioridad: {
        name: 'Comuna',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      explotacion: {
        name: 'Explotacion',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      baseDatosComun: {
        name: 'BaseDatosComun',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      baseDatosHolding: {
        name: 'BaseDatosHolding',
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      columnas: {
        name: 'Columnas',
        type: DataTypes.STRING,
        allowNull: false,
      },
      columnasClavePrimaria: {
        name: 'ColumnasClavePrimaria',
        type: DataTypes.STRING(250),
        validate: {
          len: {
            args: [1, 250],
            msg: lng('validations.rangeLength', { min: 1, max: 250 }),
          },
        },
        allowNull: false,
      },
      columnasJson: {
        name: 'ColumnasJson',
        type: DataTypes.STRING,
        allowNull: true,
      },
      appMobileCosecha: {
        name: 'AppMobileCosecha',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      codEstado: {
        name: 'CodEstado',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: 'El código de estado debe ser numérico',
          },
        },
      },
      sincro: {
        name: 'Sincro',
        type: DataTypes.SMALLINT,
        validate: {
          isNumeric: {
            msg: lng('validations.numeric'),
          },
        },
      },
      lastModified: {
        name: 'LastModified',
        type: DataTypes.BIGINT,
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
      tableName: 'TB_SIS_TablaEntidad',
      sync: { alter: false },
    },
  );
};

module.exports = TablaEntidad;
