const { CampoRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class CampoService {
  constructor({ codProductor, lng }) {
    this._repository = new CampoRepository({ codProductor: codProductor, lng: lng });
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findAllCodCampo({ campos }) {
    const codCampos = campos.map(campo => {
      return { codCampo: campo.codCampo };
    });

    return await this._repository.findAllCodCampo({ codCampos: codCampos });
  }

  async findByCodCampo({ cod }) {
    const campo = await this._repository.findByCodCampo({ cod: cod });

    if (campo.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return campo[0];
  }

  async create({ campo }) {
    return await this._repository.create(campo);
  }

  async update({ campo, cod }) {
    return await this._repository.update({
      codCampo: cod,
      data: campo,
    });
  }

  async delete({ cod }) {
    await this._repository.update({
      codCampo: cod,
      data: {
        codEstado: 2,
      },
    });
  }
}

module.exports = CampoService;
