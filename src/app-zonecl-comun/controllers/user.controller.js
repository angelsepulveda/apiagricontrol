const { UserService } = require('../services');
class UserController {
  async findAll(req, res, next) {
    try {
      const service = new UserService({ lng: req.t });
      const users = await service.findAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async findByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const service = new UserService({ lng: req.t });
      const user = await service.findByUserId({ userId: userId });
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async findAllUserCampo(req, res, next) {
    try {
      const service = new UserService({ lng: req.t });
      const users = await service.findAllUserCampo();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const { body } = req;
      const service = new UserService({ lng: req.t });
      const user = await service.create(body);
      return res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { body } = req;
      const { userId } = req.params;
      const service = new UserService({ lng: req.t });
      const user = await service.update(userId, body);
      return res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const service = new UserService({ lng: req.t });
      await service.delete(userId);
      return res.status(200).send({
        message: 'El registro se elimino correctamente',
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
