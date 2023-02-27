const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const compression = require('compression');
const errorHandler = require('../middlewares/error-handler.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  ClasificacionDensidadRoute,
  ComunaMasterRoute,
  EspecieMasterRoute,
  EstadoRoute,
  PaisMasterRoute,
  RegionMasterRoute,
  SexoRoute,
  TipoCoberturaRoute,
  TipoEquipoRoute,
  VariedadMasterRoute,
  EstadoCivilRoute,
  RelacionFamiliarRoute,
  TipoCargaFamiliarRoute,
  UnidadRoute,
  FuncionalidadRoute,
  ProductorRoute,
  UserRoute,
  TipoRecoleccionRoutes,
  UnidadMedidaRoutes,
  BancoRoutes,
} = require('../../../app-zonecl-comun/routes');

const {
  CuartelRoutes,
  CuartelVariedadRoutes,
  PaisRoutes,
  EspecieRoutes,
  RegionRoutes,
  ComunaRoutes,
  LocalidadRoutes,
  MonedaRoutes,
  SaludRoutes,
  PrevisionRoutes,
  CajaCompensacionRoutes,
  MutualidadRoutes,
  HileraRoutes,
  SectorRoutes,
  EquipoRoutes,
  TemporadaRoutes,
  EmpresaRoutes,
  TrabajadorRoutes,
  TrabajadorCargaFamiliarRoutes,
  DireccionRoutes,
  BinsRoutes,
  CalidadRoutes,
  ContratistaRoutes,
  FormatoCosechaRoutes,
  ProduccionRoutes,
  TratoRoutes,
  CampoRoutes,
  CuadrillaRoutes,
  VariedadRoutes,
  TablaEntidadRoutes,
} = require('../../../app-zonecl-agricontrol/routes');

const AuthRoute = require('./auth.route');
const CosechaRoute = require('./cosecha.route');

module.exports = function () {
  const router = express.Router();
  const apiRoute = Router();
  const cuartelRoute = CuartelRoutes();
  const regionRoute = RegionRoutes();
  const comunaRoute = ComunaRoutes();
  const cuartelVariedadRoute = CuartelVariedadRoutes();
  const especieRoute = EspecieRoutes();
  const paisRoute = PaisRoutes();
  const localidadRoute = LocalidadRoutes();
  const clasificacionDensidadRoute = ClasificacionDensidadRoute();
  const monedaRoute = MonedaRoutes();
  const saludRoute = SaludRoutes();
  const comunaMasterRoute = ComunaMasterRoute();
  const especieMasterRoute = EspecieMasterRoute();
  const regionMasterRoute = RegionMasterRoute();
  const sexoRoute = SexoRoute();
  const tipocoberuraRoute = TipoCoberturaRoute();
  const tipoequipoRoute = TipoEquipoRoute();
  const variedadMasterRoute = VariedadMasterRoute();
  const tiporecoleccionRoute = TipoRecoleccionRoutes();
  const unidadMedidaRoute = UnidadMedidaRoutes();
  const bancoRoute = BancoRoutes();

  const estadoRoute = EstadoRoute();
  const paisMasterRoute = PaisMasterRoute();
  const estadocivilRoute = EstadoCivilRoute();
  const relacionfamiliarRoute = RelacionFamiliarRoute();
  const tipocargafamiliarRoute = TipoCargaFamiliarRoute();
  const unidadRoute = UnidadRoute();
  const funcionalidadRoute = FuncionalidadRoute();
  const productorRoute = ProductorRoute();

  const previsionRoute = PrevisionRoutes();
  const cajaCompensacionRoute = CajaCompensacionRoutes();
  const mutualidadRoute = MutualidadRoutes();
  const hileraRoute = HileraRoutes();
  const sectorRoute = SectorRoutes();
  const equipoRoute = EquipoRoutes();
  const temporadaRoute = TemporadaRoutes();
  const empresaRoute = EmpresaRoutes();
  const TrabajadorRoute = TrabajadorRoutes();
  const TrabajadorCargaFamiliarRoute = TrabajadorCargaFamiliarRoutes();
  const direccionRoute = DireccionRoutes();
  const binsRoute = BinsRoutes();
  const calidadRoute = CalidadRoutes();
  const contratistaRoute = ContratistaRoutes();
  const formatocosechaRoute = FormatoCosechaRoutes();
  const produccionRoute = ProduccionRoutes();
  const tratoRoute = TratoRoutes();
  const campoRoute = CampoRoutes();
  const cuadrillaRoute = CuadrillaRoutes();
  const variedadRoute = VariedadRoutes();
  const tablaEntidadRoute = TablaEntidadRoutes();

  const cosechaRoute = CosechaRoute();

  const userRoute = UserRoute();
  const authRoute = AuthRoute();

  apiRoute.use(cors()).use(express.json()).use(compression());

  apiRoute.use('/clasificaciones-densidades', authMiddleware, clasificacionDensidadRoute);
  apiRoute.use('/comunas-master', authMiddleware, comunaMasterRoute);
  apiRoute.use('/especies-master', authMiddleware, especieMasterRoute);
  apiRoute.use('/estados', authMiddleware, estadoRoute);
  apiRoute.use('/paises-master', authMiddleware, paisMasterRoute);
  apiRoute.use('/regiones-master', authMiddleware, regionMasterRoute);
  apiRoute.use('/sexo', authMiddleware, sexoRoute);
  apiRoute.use('/tipos-coberturas', authMiddleware, tipocoberuraRoute);
  apiRoute.use('/tipos-equipos', authMiddleware, tipoequipoRoute);
  apiRoute.use('/variedades-master', authMiddleware, variedadMasterRoute);
  apiRoute.use('/estados-civiles', authMiddleware, estadocivilRoute);
  apiRoute.use('/relaciones-familiares', authMiddleware, relacionfamiliarRoute);
  apiRoute.use('/tipos-cargas-familiares', authMiddleware, tipocargafamiliarRoute);
  apiRoute.use('/unidades', authMiddleware, unidadRoute);
  apiRoute.use('/funcionalidades', authMiddleware, funcionalidadRoute);
  apiRoute.use('/productores', authMiddleware, productorRoute);
  apiRoute.use('/variedades', authMiddleware, variedadRoute);
  apiRoute.use('/tipos-recolecciones', authMiddleware, tiporecoleccionRoute);
  apiRoute.use('/unidades-medidas', authMiddleware, unidadMedidaRoute);
  apiRoute.use('/bancos', authMiddleware, bancoRoute);

  apiRoute.use('/cuarteles', authMiddleware, cuartelRoute);
  apiRoute.use('/cuarteles-variedades', authMiddleware, cuartelVariedadRoute);
  apiRoute.use('/paises', authMiddleware, paisRoute);
  apiRoute.use('/especies', authMiddleware, especieRoute);
  apiRoute.use('/regiones', authMiddleware, regionRoute);
  apiRoute.use('/comunas', authMiddleware, comunaRoute);
  apiRoute.use('/localidades', authMiddleware, localidadRoute);
  apiRoute.use('/monedas', authMiddleware, monedaRoute);
  apiRoute.use('/salud', authMiddleware, saludRoute);
  apiRoute.use('/previsiones', authMiddleware, previsionRoute);
  apiRoute.use('/cajas-compensaciones', authMiddleware, cajaCompensacionRoute);
  apiRoute.use('/mutualidades', authMiddleware, mutualidadRoute);
  apiRoute.use('/hileras', authMiddleware, hileraRoute);
  apiRoute.use('/sectores', authMiddleware, sectorRoute);
  apiRoute.use('/equipos', authMiddleware, equipoRoute);
  apiRoute.use('/temporadas', authMiddleware, temporadaRoute);
  apiRoute.use('/empresas', authMiddleware, empresaRoute);
  apiRoute.use('/trabajadores', authMiddleware, TrabajadorRoute);
  apiRoute.use('/trabajadores-cargas-familiares', authMiddleware, TrabajadorCargaFamiliarRoute);
  apiRoute.use('/direcciones', authMiddleware, direccionRoute);
  apiRoute.use('/bins', authMiddleware, binsRoute);
  apiRoute.use('/calidades', authMiddleware, calidadRoute);
  apiRoute.use('/contratistas', authMiddleware, contratistaRoute);
  apiRoute.use('/formatos-cosechas', authMiddleware, formatocosechaRoute);
  apiRoute.use('/producciones', authMiddleware, produccionRoute);
  apiRoute.use('/tratos', authMiddleware, tratoRoute);
  apiRoute.use('/campos', authMiddleware, campoRoute);
  apiRoute.use('/cuadrillas', authMiddleware, cuadrillaRoute);
  apiRoute.use('/tablas-entidades', authMiddleware, tablaEntidadRoute);

  apiRoute.use('/cosecha', authMiddleware, cosechaRoute);

  apiRoute.use('/users', authMiddleware, userRoute);
  apiRoute.use('/auth', authRoute);

  router.use('/api', apiRoute);
  router.use(errorHandler);

  return router;
};
