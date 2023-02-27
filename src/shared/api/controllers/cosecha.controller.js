const { CosechaService } = require('../services');
class CosechaController {
  async informeCompleto(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fechaDesde = req.query.fechaDesde;
      const fechaHasta = req.query.fechaHasta;

      if (!fechaDesde || !fechaHasta) {
        return res.status(400).send({
          message: 'Debe ingresar fecha desde y fecha hasta',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.informeCompleto(fechaDesde, fechaHasta);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async informeDiarioDetallado(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const campo = req.query.campo;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.informeDiarioDetallado({ fecha: fecha, campo: campo, especie: especie });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchCamposCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchCamposCosechas({ fecha: fecha, especie: especie, user: user });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchVariedadesCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchVariedadesCosechas({ fecha: fecha, especie: especie, user: user });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchCuadrillasCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchCuadrillasCosechas({ fecha: fecha, especie: especie, user: user });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchCamposVariedadesCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const variedad = req.query.variedad;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchCamposVariedadesCosechas({
        fecha: fecha,
        variedad: variedad,
        user: user,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchSectoresCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;
      const campo = req.query.campo;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchSectoresCosechas({ fecha: fecha, campo: campo, especie: especie });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchCuartelesCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;
      const sector = req.query.sector;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchCuartelesCosechas({ fecha: fecha, sector: sector, especie: especie });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchVariedadesSectoresCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const variedad = req.query.variedad;
      const campo = req.query.campo;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchVariedadesSectoresCosechas({
        fecha: fecha,
        variedad: variedad,
        campo: campo,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchVariedadesCuartelesCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const variedad = req.query.variedad;
      const sector = req.query.sector;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchVariedadesCuartelesCosechas({
        fecha: fecha,
        variedad: variedad,
        sector: sector,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchTrabajadoresCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchTrabajadoresCosechas({
        fecha: fecha,
        especie: especie,
        user: user,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchFormatoCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchFormatoCosechas({
        fecha: fecha,
        especie: especie,
        user: user,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchContratistasCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.searchContratistaCosechas({
        fecha: fecha,
        especie: especie,
        user: user,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async graficoFormatoCosechas(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const formatoCosecha = req.query.formatoCosecha;
      const campo = req.query.campo !== undefined ? req.query.campo : null;
      const sector = req.query.sector !== undefined ? req.query.sector : null;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.graficoFormatoCosechas({
        fecha: fecha,
        campo: campo,
        sector: sector,
        formatoCosecha: formatoCosecha,
      });

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async informeDiarioResumido(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const campo = req.query.campo;
      const especie = req.query.especie;

      if (!fecha) {
        return res.status(400).send({
          message: 'Debe ingresar la fecha',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.informeDiarioResumido({ fecha: fecha, campo: campo, especie: especie });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async informeCompletoGrafico(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fechaDesde = req.query.fechaDesde;
      const fechaHasta = req.query.fechaHasta;
      const codCampo = req.query.codCampo;

      if (!fechaDesde || !fechaHasta || !codCampo) {
        return res.status(400).send({
          message: 'Debe ingresar fecha desde, fecha hasta y campo',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.informeCompletoGrafico({
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        codCampo: codCampo,
      });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async informeDiarioGrafico(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const fecha = req.query.fecha;
      const codCampo = req.query.codCampo;
      const codEspecie = req.query.codEspecie;

      if (!fecha || !codCampo || !codEspecie) {
        return res.status(400).send({
          message: 'Debe ingresar fecha,campo y especie',
        });
      }
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.informeDiarioGrafico({
        fecha: fecha,
        codCampo: codCampo,
        codEspecie: codEspecie,
      });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async findMoreRecent(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const result = await cosechaService.findMoreRecent();

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async searchProduccion(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const filter = {
        campo: req.query.campo,
        trabajador: req.query.trabajador,
        contratista: req.query.contratista,
        equipo: req.query.equipo,
        cuadrilla: req.query.cuadrilla,
        cuartel: req.query.cuartel,
        variedad: req.query.variedad,
        formatoCosecha: req.query.formatoCosecha,
        fecha: req.query.fecha,
        especie: req.query.especie,
      };
      const result = await cosechaService.searchProduccion(filter);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateProduccion(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const data = req.body;
      await cosechaService.updateProduccion(data);
      return res.status(200).json({ message: 'OK' });
    } catch (e) {
      next(e);
    }
  }

  async deleteProduccion(req, res, next) {
    const user = req.user;
    const codProductor = user.codProductor.toString();
    try {
      const cosechaService = new CosechaService({ codProductor, lng: req.t });
      const data = req.body;
      await cosechaService.deleteProduccion(data);
      return res.status(200).json({ message: 'OK' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CosechaController;
