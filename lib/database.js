import Collection from './collection';

/**
 * @constructor
 * @param {monguru.Client} client
 * @param {string} name
 * @param {object} [options]
 */
export default function Database(client, name, options) {
  this.client = client;
  this.name = name;
  this.options = options;
  this.raw = null;
}

Object.assign(Database.prototype, {
  /**
   * @param {string} name
   * @param {object} [options]
   * @return {monguru.Collection}
   */
  collection(name, options) {
    if (name == null) {
      return new Proxy(this, {
        get: (target, property) => target.collection(property),
      });
    }
    return new Collection(this, name, options);
  },
  /**
   * @return {Promise<mongodb.Db>}
   */
  async connected() {
    if (!this.raw) {
      this.raw = (await this.client.connected()).db(this.name, this.options);
    }
    return this.raw;
  },
});
