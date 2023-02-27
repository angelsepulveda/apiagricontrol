const express = require('express');
const { CosechaController } = require('../controllers');

module.exports = function () {
  const router = express.Router();
  const controller = new CosechaController();

  router.put('/delete', controller.deleteProduccion);
  router.get('/informe-completo', controller.informeCompleto);
  router.get('/informe-diario-detallado', controller.informeDiarioDetallado);
  router.get('/informe-diario-resumido', controller.informeDiarioResumido);
  router.get('/informe-completo-grafico', controller.informeCompletoGrafico);
  router.get('/informe-diario-grafico', controller.informeDiarioGrafico);
  router.get('/search-campos', controller.searchCamposCosechas);
  router.get('/search-variedades', controller.searchVariedadesCosechas);
  router.get('/search-cuadrillas', controller.searchCuadrillasCosechas);
  router.get('/search-sectores', controller.searchSectoresCosechas);
  router.get('/search-cuarteles', controller.searchCuartelesCosechas);
  router.get('/search-variedades-campos', controller.searchCamposVariedadesCosechas);
  router.get('/search-variedades-sectores', controller.searchVariedadesSectoresCosechas);
  router.get('/search-variedades-cuarteles', controller.searchVariedadesCuartelesCosechas);
  router.get('/search-formato-cosechas', controller.searchFormatoCosechas);
  router.get('/search-contratistas', controller.searchContratistasCosechas);
  router.get('/find-more-recent', controller.findMoreRecent);
  router.get('/search-trabajadores', controller.searchTrabajadoresCosechas);
  router.get('/search', controller.searchProduccion);
  router.get('/grafico-formato-cosechas', controller.graficoFormatoCosechas);
  router.put('/', controller.updateProduccion);

  return router;
};
