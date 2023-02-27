class DatabaseException extends Error {
  constructor(e, code = 500) {
    super(e.message);
    this.exception = e;
    this.code = code;
    this.tipo = 'Database Error';
  }
}

module.exports = DatabaseException;
