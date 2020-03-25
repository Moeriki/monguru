import { MongoClient } from 'mongodb';

import { DEFAULT_DATABASE } from './constants';
import Database from './database';
import { noop } from './utils';

// exports

/**
 * @constructor
 * @param {string} connectionUri
 * @param {object} [options]
 */
export default function Client(connectionUri, options) {
  this.raw = new MongoClient(connectionUri, options);
  this.connected = null;
}

Object.assign(Client.prototype, {
  /**
   * @param {string} name
   * @return {monguru.Collection}
   */
  collection(...arguments_) {
    return this.database(DEFAULT_DATABASE).collection(...arguments_);
  },
  /**
   * @param {boolean} [force=false]
   * @return {Promise}
   */
  close(force = false) {
    if (!this.connected) {
      return Promise.resolve();
    }
    return this.connected.close(force).then(noop);
  },
  /**
   * @return {Promise<mongodb.MongoClient>}
   */
  async connected() {
    if (!this.connected) {
      this.connected = await this.raw.connect();
    }
    return this.connected;
  },
  /**
   * @param {string} name
   * @param {object} [options]
   * @return {monguru.Database}
   */
  database(name, options) {
    if (name == null) {
      return new Proxy(this, {
        get: (target, property) => target.database(property),
      });
    }
    return new Database(this, name, options);
  },
});
