const { UserRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class UserService {
  constructor({ lng }) {
    this._repository = new UserRepository();
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findAllUserCampo() {
    const users = await this._repository.findAll();

    return await Promise.all(
      users.map(async user => {
        const repository = new UserRepository();
        const cod = user.codProductor.toString().padStart(4, '0');

        const userCampos = await repository.findByUserCodCampo({ userId: user.userId, codProductor: cod });

        if (userCampos.length > 0) {
          return {
            userId: user.userId,
            codProductor: user.codProductor,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            campos: userCampos.map(campo => campo.codCampo),
            role: user.role,
            isActive: user.isActive,
          };
        }

        return {
          userId: user.userId,
          codProductor: user.codProductor,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          campos: [],
          role: user.role,
          isActive: user.isActive,
        };
      }),
    );
  }

  async findByUserId({ userId }) {
    const user = await this._repository.findByUserId(userId);

    if (user.length <= 0) throw new NotFoundException(this._lng('notFound'));

    const userCampos = await this._repository.findByUserCodCampo({
      userId: user.userId,
      codProductor: user.codProductor.toString().padStart(4, '0'),
    });

    if (userCampos.length > 0) {
      return {
        userId: user.userId,
        codProductor: user.codProductor,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        campos: userCampos.map(campo => campo.codCampo),
        role: user.role,
        isActive: user.isActive,
      };
    }

    return {
      userId: user.userId,
      codProductor: user.codProductor,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      campos: [],
      role: user.role,
      isActive: user.isActive,
    };

    return user;
  }
  async create(user) {
    return await this._repository.create({
      data: {
        codProductor: user.codProductor,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        password: user.password,
        role: user.role,
        isActive: user.isActive,
      },
      campos: user.campos,
    });
  }

  async update(userId, data) {
    return await this._repository.update({
      userId: userId,
      data: {
        codProductor: data.codProductor,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        password: data.password,
        role: data.role,
        isActive: data.isActive,
      },
      campos: data.campos,
    });
  }

  async delete(userId) {
    await this._repository.delete(userId);
  }
}
module.exports = UserService;
