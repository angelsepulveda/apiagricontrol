const { RegionMasterRepository } = require('../repositories');
const { NotFoundException } = require('../../shared/exceptions');

class RegionMasterService {
  constructor({ lng }) {
    this._repository = new RegionMasterRepository();
    this._lng = lng;
  }

  async findAll() {
    return await this._repository.findAll();
  }

  async findSelect() {
    return await this._repository.findSelect();
  }

  async findByCodPais({ cod }) {
    return await this._repository.findByCodPais({ cod: cod });
  }

  async findByCodRegion({ cod }) {
    const region = await this._repository.findByCodRegion({ cod: cod });

    if (region.length <= 0) throw new NotFoundException(this._lng('notFound'));

    return region[0];
  }
}
module.exports = RegionMasterService;
