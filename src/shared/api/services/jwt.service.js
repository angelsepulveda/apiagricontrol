const jwt = require('jsonwebtoken');
const { AUTH } = require('../../config/environments');
const authConfig = AUTH;

class JwtService {
  generateToken(user) {
    return jwt.sign({ data: user }, authConfig.secret, {
      expiresIn: authConfig.expires,
    });
  }

  validate(token) {
    return jwt.verify(token, authConfig.secret, (err, decode) => {
      if (err) {
        return null;
      } else {
        return decode;
      }
    });
  }
}

module.exports = JwtService;
