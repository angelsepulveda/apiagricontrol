const StartUp = require('./shared/api/startup');
const { loggerError } = require('./shared/helpers/logger.helper');

const application = new StartUp();

application.start().catch(err => {
  loggerError('Error en el servidor', err);
});
