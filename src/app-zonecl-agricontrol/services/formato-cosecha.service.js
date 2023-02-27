const { FormatoCosechaRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');
const { loggerError } = require('../../shared/helpers/logger.helper');

class FormatoCosechaService {
  constructor({ codProductor, lng }) {
    this._repository = new FormatoCosechaRepository({ codProductor: codProductor, lng: lng });
    this._codProductor = codProductor;

    this._lng = lng;
  }

  async findAll() {
    return this._repository.findAll();
  }

  async findByCodFormatoCosecha({ cod }) {
    try {
      const formatocosecha = await this._repository.findByCodFormatoCosecha({ cod: cod });

      if (formatocosecha.length <= 0) throw new NotFoundException(this._lng('notFound'));
      return formatocosecha[0];
    } catch (e) {
      loggerError('error en formato de cosechas', e);
    }
  }

  async findByFormatoCosechaCampos() {
    try {
      const formatoCoseachas = await this._repository.findAll();
      return Promise.all(
        formatoCoseachas.map(async formatoCosecha => {
          const lng = this._lng;
          const cod = this._codProductor.toString().padStart(4, '0');

          const repository = new FormatoCosechaRepository({ codProductor: cod, lng: lng });

          const formatoCosechaCampos = await repository.findByFormatoCosechasCampos({
            codFormatoCosecha: formatoCosecha.codFormatoCosecha,
            codProductor: cod,
          });

          const campos = {
            ...formatoCosecha,
            campos: formatoCosechaCampos.map(formatoCosechaCampo => formatoCosechaCampo.codCampo),
          };

          return campos;
        }),
      );
    } catch (e) {
      loggerError('error en formato de cosechas', e);
    }
  }

  async formatoCosechasCamposAll({ codCampo }) {
    return await this._repository.formatoCosechasCamposAll({ codCampo: codCampo });
  }

  async create({ formato }) {
    return await this._repository.create({
      data: {
        descripcion: formato.descripcion,
        pesoMinimo: formato.pesoMinimo,
        pesoMaximo: formato.pesoMaximo,
        validarPeso: formato.validarPeso,
        codTipoRecoleccion: formato.codTipoRecoleccion,
        codUnidadMedida: formato.codUnidadMedida,
        valorPromedio: formato.valorPromedio,
        unidadesAPesar: formato.unidadesAPesar,
        codEspecie: formato.codEspecie,
        codCalidad: formato.codCalidad,
        codEstado: formato.codEstado,
      },
      campos: formato.campos,
    });
  }

  async update({ formato, cod }) {
    return await this._repository.update({
      cod: cod,
      data: {
        descripcion: formato.descripcion,
        pesoMinimo: formato.pesoMinimo,
        pesoMaximo: formato.pesoMaximo,
        validarPeso: formato.validarPeso,
        codTipoRecoleccion: formato.codTipoRecoleccion,
        codUnidadMedida: formato.codUnidadMedida,
        valorPromedio: formato.valorPromedio,
        unidadesAPesar: formato.unidadesAPesar,
        codEspecie: formato.codEspecie,
        codCalidad: formato.codCalidad,
        codEstado: formato.codEstado,
      },
      campos: formato.campos,
    });
  }

  async delete({ cod }) {
    await this._repository.delete({
      cod: cod,
    });
  }
}

module.exports = FormatoCosechaService;
