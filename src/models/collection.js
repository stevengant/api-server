'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      const record = await this.model.create(json);
      return record;
    } catch(e) {
      console.error('ERROR IN COLLECTION INTERFACE');
      return(e);
    }
  }

  async read(id = null) {
    try {
      if(!id) {
        // get all
        const records = await this.model.findAll();
        return records;
      
      } else {
        // get by id
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      }
    } catch (e) {
      console.error('ERROR IN COLLECTION INTERFACE');
      return(e);
    }
  }

  async update(json) {
    try {
      const record = await this.model.update(json);
      return record;
    } catch(e) {
      console.error('ERROR IN COLLECTION INTERFACE');
      return(e);
    }
  }
  async delete(json) {
    try {
      const record = await this.model.delete(json);
      return record;
    } catch(e) {
      console.error('ERROR IN COLLECTION INTERFACE');
      return(e);
    }
  }
}

module.exports = Collection;