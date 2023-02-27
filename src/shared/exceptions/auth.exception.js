class AuthException extends Error {
  constructor(message, code = 401) {
    super(message);
    this.tipo = 'Authentification Error';
    this.code = code;
  }
}

module.exports = AuthException;
