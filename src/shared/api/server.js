const express = require('express');
const config = require('../config/environments');
const Routes = require('./routes');
const middleware = require('i18next-http-middleware');

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const { loggerInfo } = require('../helpers/logger.helper');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/translation.json',
    },
  });

class Server {
  constructor() {
    this._config = config;
    this._router = Routes();
    this._express = express();
    this._express.use(middleware.handle(i18next));
    this._express.use(this._router);
  }

  start() {
    return new Promise(resolve => {
      const http = this._express.listen(this._config.PORT, () => {
        const { port } = http.address();
        loggerInfo('Servidor corriendo en el http://localhost:' + port);
        resolve();
      });
    });
  }
}

module.exports = Server;
