import mongoose, { Schema } from 'mongoose';

class BaseSchema extends Schema {
  constructor(schemaModel) {
    super({
      ...schemaModel,
      __v: { type: Number, select: false },
      createdOn: { type: Date, default: Date.now },
      updatedOn: { type: Date, default: Date.now },
      deletedOn: { type: Date, default: null }
    })
  }
}

export default BaseSchema;