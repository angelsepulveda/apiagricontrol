const i18next = require('i18next');
const backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const lngI18next = i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'es',
    backend: {
      loadPath: '../locales/{{lng}}/translation.json',
    },
  });

module.exports = lngI18next;
