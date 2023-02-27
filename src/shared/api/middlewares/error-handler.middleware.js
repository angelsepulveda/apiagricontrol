const { loggerError } = require('../../helpers/logger.helper');

const errorHandler = (err, req, res, next) => {
  let errorMessage = {};
  let code = 500;

  switch (err.name) {
    case 'SequelizeConnectionRefusedError':
      errorMessage = { tipo: 'Database', errores: err.parent.original };
      break;
    case 'SequelizeUniqueConstraintError':
      const messages = err.errors.map(error => ({ column: error.path, value: error.message }));
      errorMessage = { tipo: 'Database Unique Violation', errores: messages };
      code = 422;
      break;
    case 'SequelizeDatabaseError':
      errorMessage = { tipo: 'Database', errores: err.parent.sqlMessage };
      break;
    case 'SequelizeValidationError':
      const message = err.errors.map(error => ({ column: error.path, value: error.message }));
      errorMessage = { tipo: 'Validation', errores: message };
      code = 422;
      break;
    case 'SequelizeConnectionError':
      errorMessage = { tipo: 'Database', errores: req.t('errorDatabase') };
      code = 500;
      break;
    default:
      loggerError('ERROR', err);
      if (err.code !== undefined && err.code !== null) {
        errorMessage = { tipo: err.tipo, errores: err.message };
        code = err.code;
      } else {
        const error = new Error(err);
        errorMessage = { tipo: 'desconocido', errores: error.message };
        code = 500;
      }
      break;
  }

  res.status(code).json(errorMessage);

  next();
};
module.exports = errorHandler;
