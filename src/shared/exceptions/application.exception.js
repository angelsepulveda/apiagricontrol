class ApplicationException extends Error {
  constructor(message, code = 500) {
    super(message);
    this.code = code;
    this.tipo = 'Application';
  }
}

module.exports = ApplicationException;
