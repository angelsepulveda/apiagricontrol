const { DataTypes } = require('sequelize');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');
const bcrypt = require('bcryptjs');

const sequelize = new AppZonecComunDB().sequelize();
const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //     isAlpha: {
      //         msg: "El nombre debe contener solo letras"
      //     },
      // }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'El email es requerido',
        },
        isEmail: {
          msg: 'El email no es válido',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La contraseña es requerida',
        },
        len: {
          args: [6, 200],
          msg: 'La contraseña debe tener entre 6 y 200 caracteres',
        },
      },
    },
    role: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isNumeric: {
          msg: 'El rol debe ser un número',
        },
      },
    },
    isActive: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: 'El estado debe ser 0 o 1',
        },
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    codProductor: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La codigo del productor es requerido',
        },
        isNumeric: {
          msg: 'El código del productor debe ser un número',
        },
      },
    },
  },
  {
    // Other model options go here
    timestamps: false,
    freezeTableName: true,
    tableName: 'TB_WEB_User',
    sync: { alter: false },
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async user => {
        if (user.dataValues.password !== user._previousDataValues.password) {
          user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
        }
      },
      // beforeBulkUpdate: async user => {
      //   if (user.attributes.password) {
      //     user.attributes.password = await bcrypt.hash(user.attributes.password, 10);
      //   }
      // },
    },
  },
);

module.exports = User;
