/* eslint no-await-in-loop:0 */

import { Cursor } from 'mongodb';

const ACTION_DELETE = Symbol('delete');
const ACTION_FIND = Symbol('find');
const ACTION_UPDATE = Symbol('update');

/**
 * @constructor
 * @param {monguru.Collection} collection
 */
export default function Inquiry(collection) {
  this.collection = collection;
}

Object.assign(Inquiry.prototype, {
  async *[Symbol.asyncIterator]() {
    if (
      this.one ||
      this.action === ACTION_DELETE ||
      this.action === ACTION_UPDATE
    ) {
      throw new TypeError('You can only iterate over the results of find().');
    }
    const cursor = this.execute();
    if (!(cursor instanceof Cursor)) {
      // TODO
    }
    try {
      while (await cursor.hasNext()) {
        yield await cursor.next();
      }
    } finally {
      await cursor.close();
    }
  },
  /**
   * @param {function} onRejected
   * @return {Promise<?>} result
   */
  catch(onRejected) {
    return this.execute().catch(onRejected);
  },
  /**
   * @return {Inquiry} this
   */
  delete() {
    this.action = ACTION_DELETE;
    return this;
  },
  /**
   * @param {object} query
   * @return {mongodb.Cursor|Promise<[*]>} results
   */
  async execute() {
    if (this.action === ACTION_DELETE) {
      const { deletedCount } = await (this.limit === 1
        ? this.collection.deleteOne(this.query)
        : this.collection.delete(this.query));
      return deletedCount;
    }
    if (this.action === ACTION_UPDATE) {
      // TODO updateMany
      // TODO updateOne
    } else {
      // TODO find
      // TODO findOne
    }

    if (this.limit === 1) {
      //
    }
    // console.log('HEAVY QUERY');
    return Promise.resolve([]); // TODO
    // return this;
  },
  /**
   * @param {object} query
   * @param {object} [options]
   * @return {Inquiry} this
   */
  find(query, options) {
    this.action = ACTION_FIND;
    this.query = query;
    this.options = options;
    return this;
  },
  /**
   * @param {function} onFinally
   * @return {Promise<?>} result
   */
  finally(onFinally) {
    return this.execute().finally(onFinally);
  },
  /**
   * @param {number} limit
   * @return {Inquiry} this
   */
  limit(limit) {
    this.limit = limit;
    return this;
  },
  /**
   * @return {Inquiry} this
   */
  one() {
    this.limit = 1;
    this.one = true;
    return this;
  },
  /**
   * @param {number} skip
   * @return {Inquiry} this
   */
  skip(skip) {
    this.skip = skip;
    return this;
  },
  /**
   * @return {Inquiry} this
   */
  sort() {
    // TODO
    return this;
  },
  /**
   * @param {function} onFulfilled
   * @param {function} onRejected
   * @return {Promise<?>} result
   */
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  },
  /**
   * @return {Inquiry} this
   */
  update() {
    this.action = ACTION_UPDATE;
    return this;
  },
});
