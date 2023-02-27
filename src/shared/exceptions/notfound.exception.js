class NotFoundException extends Error {
  constructor(message, code = 404) {
    super(message);
    this.tipo = 'Not Found';
    this.code = code;
  }
}

module.exports = NotFoundException;
