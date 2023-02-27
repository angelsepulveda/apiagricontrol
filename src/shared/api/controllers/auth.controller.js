const { AuthService } = require('../services');

class AuthController {
  async login(req, res, next) {
    try {
      const { body } = req;
      const authService = new AuthService();
      const result = await authService.login(body);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
