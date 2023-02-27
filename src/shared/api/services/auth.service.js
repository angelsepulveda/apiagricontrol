const { UserRepository } = require('../../../app-zonecl-comun/repositories');
const AuthException = require('../../exceptions/auth.exception');
const JwtService = require('./jwt.service');

class AuthService {
  constructor() {
    this._userRepository = new UserRepository();
    this._jwtService = new JwtService();
  }

  async login(params) {
    const user = await this._userRepository.login(params);

    let data = null;

    if (!user) throw new AuthException('Error en el inicio de sesion');

    const cod = user.codProductor.toString().padStart(4, '0');

    const userCampos = await this._userRepository.findByUserCodCampo({
      userId: user.userId,
      codProductor: cod,
    });

    data = {
      id: user.userId,
      role: user.role,
      codProductor: user.codProductor,
      campos: userCampos,
    };

    const token = this._jwtService.generateToken(data);

    return {
      token: token,
      user: {
        id: user.id,
        codProductor: user.codProductor,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };
  }
}

module.exports = AuthService;
