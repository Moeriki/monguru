import Inquiry from './inquiry';
import { clone } from './utils';

/**
 * @constructor
 * @param {monguru.Database} database
 * @param {string} name
 * @param {object} [options]
 * @param {object} [options.schema]
 */
export default function Collection(database, name, { schema } = {}, options) {
  this.database = database;
  this.name = name;
  this.schema = schema;
  this.options = options;
  this.raw = null;
}

Object.assign(Collection.prototype, {
  /**
   * @return {Promise<mongodb.Collection>} promises a raw collection
   */
  async connected() {
    if (!this.raw) {
      this.raw = (await this.database.connected()).collection(
        this.name,
        this.options,
      );
    }
    return this.raw;
  },
  /**
   * @param {object} [query]
   * @param {object} [options]
   * @return {Promise<number>}
   */
  async count(query, options) {
    return (await this.connected()).count(query, options);
  },
  /**
   * @param {Iterable<object>} records
   * @param {object} [options]
   * @return {Promise<Array>} promises a list of created records
   */
  async create(records, options = {}) {
    const arrayOfRecords = Array.isArray(records)
      ? records.map(clone)
      : [...records].map(clone);
    const rawCollection = await this.connected();
    const { result, ops } = await rawCollection.insertMany(
      arrayOfRecords,
      options,
    );
    if (result.ok === 1) {
      return ops;
    }
    throw new Error('TODO'); // TODO when not ok
  },
  /**
   * @param {object} record
   * @param {object} [options]
   * @return {Promise<object>} promise a created record
   */
  async createOne(record, options) {
    const rawCollection = await this.connected();
    const { result, ops } = await rawCollection.insertOne(
      clone(record),
      options,
    );
    if (result.ok === 1) {
      return ops[0];
    }
    throw new Error('TODO'); // TODO when not ok
  },
  /**
   * @param {object} query
   * @param {object} [options]
   * @return {Promise<number>} 0 … ∞
   */
  delete(query, options) {
    return new Inquiry(this).find(query, options).delete();
  },
  /**
   * @param {object} query
   * @param {object} [options]
   * @return {Promise<number>} 0 || 1
   */
  deleteOne(query, options) {
    return new Inquiry(this).find(query, options).one().delete();
  },
  /**
   * @param {object} query
   * @param {object} [options]
   * @return {Query}
   */
  find(query, options) {
    return new Inquiry(this).find(query, options);
  },
  /**
   * @param {object} query
   * @param {object} [options]
   * @return {Promise<object>} promises a record
   */
  findOne(query, options) {
    return new Inquiry(this).find(query, options).one();
  },
});
