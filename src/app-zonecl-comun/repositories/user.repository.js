const AppZoneComunDB = require('../../shared/database/connection/app-zonec-comun');
const { AuthException } = require('../../shared/exceptions');
const { formatDateHours } = require('../../shared/helpers/date.helper');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const UserCampo = require('../models/userCampo.model');
const AppZonecComunDB = require('../../shared/database/connection/app-zonec-comun');
const { loggerInfo, loggerError } = require('../../shared/helpers/logger.helper');

class UserRepository {
  constructor() {}

  async findAll() {
    try {
      return await User.findAll({
        attributes: ['userId', 'name', 'avatar', 'email', 'role', 'isActive', 'lastLogin', 'codProductor'],
      });
    } catch (e) {
      throw e;
    }
  }

  async findByUserId(userId) {
    try {
      return await User.findByPk(userId, {
        attributes: ['userId', 'name', 'avatar', 'email', 'role', 'isActive', 'lastLogin', 'codProductor', 'isActive'],
      });
    } catch (e) {
      throw e;
    }
  }

  async findByUserCodCampo({ userId, codProductor }) {
    const db = new AppZonecComunDB();

    const tbCampo = `appzonec_agricontrol_${codProductor}.TB_GRAL_Campo as c`;

    const sql = `SELECT uc.userId, CONVERT(uc.CodCampo, NCHAR) as codCampo, c.campo
                  FROM TB_WEB_UserCampo as uc left join ${tbCampo}  ON uc.CodCampo = c.CodCampo
                  WHERE uc.userId LIKE "${userId.toString()}"`;
    const [results] = await db.sequelize().query(sql);

    return results;
  }

  async login(data) {
    //conectamos con la base de datos
    try {
      const user = await User.findOne({
        where: { email: data.email },
      });

      if (!user) {
        throw new AuthException('Credenciales no validas');
      }

      const result = !!bcrypt.compareSync(data.password, user.password);

      if (!result) {
        throw new AuthException('Credenciales no validas');
      }

      const userUpdated = {
        lastLogin: formatDateHours(new Date()),
      };

      const id = user.userId;

      await user.update(id, userUpdated);

      return user;
    } catch (e) {
      throw e;
    }
  }

  async create({ data, campos }) {
    const db = new AppZoneComunDB();

    //inserción de los de usuarios con sus campos
    await db.sequelize().transaction(async function (t) {
      let userCampoCreatedArray = [];
      const user = await User.create(data);

      if (campos !== undefined) {
        for (let i = 0; i < campos.length; i++) {
          let userCampoCreated = {
            codCampo: campos[i],
            userId: user.userId,
          };

          let userCampoCreatedNew = await UserCampo.create(
            {
              ...userCampoCreated,
            },
            { transaction: t },
          );
          userCampoCreatedArray.push(userCampoCreatedNew);
        }
      }

      return Promise.all(userCampoCreatedArray)
        .then(function (result) {
          loggerInfo('funciono', result);
        })
        .catch(function (err) {
          loggerError('error', err);
        });
    });
  }

  async update({ userId, data, campos }) {
    const db = new AppZoneComunDB();

    //inserción de los de usuarios con sus campos
    await db.sequelize().transaction(async function (t) {
      const user = await User.findByPk(userId, { transaction: t });

      let userCampoCreatedArray = [];

      await user.update(data, { transaction: t });

      if (campos !== undefined) {
        await UserCampo.destroy(
          {
            where: {
              userId: user.userId,
            },
          },
          { transaction: t },
        );

        for (let i = 0; i < campos.length; i++) {
          let userCampoCreated = {
            codCampo: campos[i],
            userId: user.userId,
          };

          let userCampoCreatedNew = await UserCampo.create(
            {
              ...userCampoCreated,
            },
            { transaction: t },
          );
          userCampoCreatedArray.push(userCampoCreatedNew);
        }
      }

      return Promise.all(userCampoCreatedArray)
        .then(function (result) {
          loggerInfo('funciono', result);
        })
        .catch(function (err) {
          loggerError('error', err);
        });
    });
  }

  async delete(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return false;
      }

      await user.destroy();

      return true;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserRepository;
