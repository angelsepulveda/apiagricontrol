const { ApplicationException } = require('../../exceptions');
const CosechaRepository = require('../repositories/cosecha.repository');
const CosechaGraficosRepository = require('../repositories/cosecha-graficos.repository');

class CosechaService {
  constructor({ codProductor, lng }) {
    this._repository = new CosechaRepository({ codProductor, lng: lng });
    this._graficosRepository = new CosechaGraficosRepository({ codProductor, lng: lng });
    this._lng = lng;
  }

  async informeCompleto(fechaDesde, fechaHasta) {
    return await this._repository.informeCompleto(fechaDesde, fechaHasta);
  }

  async informeDiarioDetallado({ fecha, campo, especie }) {
    return await this._repository.informeDiarioDetallado({ fecha: fecha, campo: campo, especie: especie });
  }

  async informeDiarioResumido({ fecha, campo, especie }) {
    return await this._repository.informeDiarioResumido({ fecha: fecha, campo: campo, especie: especie });
  }

  async searchCamposCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });
    return await this._graficosRepository.searchCamposCosechas({ fecha: fecha, especie: especie, campos: campos });
  }

  async searchTrabajadoresCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });

    return await this._graficosRepository.searchTrabajadoresCosechas({
      fecha: fecha,
      especie: especie,
      campos: campos,
    });
  }

  async searchVariedadesCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });
    return await this._graficosRepository.searchVariedadesCosechas({ fecha: fecha, especie: especie, campos: campos });
  }

  async searchCuadrillasCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });

    console.log(campos);

    return await this._graficosRepository.searchCuadrillasCosechas({ fecha: fecha, especie: especie, campos: campos });
  }

  async searchSectoresCosechas({ fecha, campo, especie }) {
    return await this._graficosRepository.searchSectoresCosechas({ fecha: fecha, campo: campo, especie: especie });
  }

  async searchCuartelesCosechas({ fecha, sector, especie }) {
    return await this._graficosRepository.searchCuartelesCosechas({ fecha: fecha, sector: sector, especie: especie });
  }

  async searchCamposVariedadesCosechas({ fecha, variedad, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });

    return await this._graficosRepository.searchCamposVariedadesCosechas({
      fecha: fecha,
      variedad: variedad,
      campos: campos,
    });
  }

  async graficoFormatoCosechas({ fecha, campo = null, sector = null, formatoCosecha }) {
    return await this._graficosRepository.graficoFormatoCosechas({
      fecha: fecha,
      campo: campo,
      sector: sector,
      formatoCosecha: formatoCosecha,
    });
  }

  async searchVariedadesSectoresCosechas({ fecha, campo, variedad }) {
    return await this._graficosRepository.searchVaridadesSectoresCosechas({
      fecha: fecha,
      campo: campo,
      variedad: variedad,
    });
  }

  async searchVariedadesCuartelesCosechas({ fecha, sector, variedad }) {
    return await this._graficosRepository.searchVaridadesCuartelesCosechas({
      fecha: fecha,
      sector: sector,
      variedad: variedad,
    });
  }

  async searchFormatoCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });
    return await this._graficosRepository.searchFormatoCosechas({ fecha: fecha, especie: especie, campos: campos });
  }

  async informeCompletoGrafico({ fechaDesde, fechaHasta, codCampo }) {
    const data = await this._repository.informeCompletoGrafico({
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      codCampo: codCampo,
    });
    const result = await this._repository.informeCompletoGraficoResumido({
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      codCampo: codCampo,
    });

    return [...data, ...result];
  }

  async searchContratistaCosechas({ fecha, especie, user }) {
    const campos = user.campos.map(campo => {
      return campo.codCampo;
    });

    return await this._graficosRepository.searchContratistasCosechas({
      fecha: fecha,
      especie: especie,
      campos: campos,
    });
  }

  async informeDiarioGrafico({ fecha, codCampo, codEspecie }) {
    return await this._repository.informeDiarioGrafico({
      fecha: fecha,
      codCampo: codCampo,
      codEspecie: codEspecie,
    });
  }

  async findMoreRecent() {
    const result = await this._repository.findMoreRecent();
    return result[0];
  }

  async searchProduccion(filter) {
    if (filter.campo === undefined && filter.campo === '0' && filter.especie === undefined && filter.especie === '0') {
      throw new ApplicationException(this._lng('validations.filtros'));
    }

    return await this._repository.searchProduccion(filter);
  }

  async updateProduccion(data) {
    await this._repository.updateProduccion(data);
  }

  async deleteProduccion(data) {
    if (data.producciones.length <= 0) throw new ApplicationException(this._lng('validations.producciones'));

    await this._repository.deleteProduccion(data);
  }
}

module.exports = CosechaService;
