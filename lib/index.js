import URL from 'url-parse';

import Client from './client';
import { DEFAULT_HOST, DEFAULT_PROTOCOL } from './constants';

// exports

export { Client as MgClient };

export { default as MgCollection } from './collection';

export { default as MgDatabase } from './database';

export { default as MgInquiry } from './inquiry';

/**
 * @param {string} connectionUri
 * @return {monguru.Client}
 */
export default function monguru(connectionUri) {
  const parsedUrl = new URL(connectionUri);

  parsedUrl.protocol =
    parsedUrl.protocol === 'about:' ? DEFAULT_PROTOCOL : parsedUrl.protocol;
  parsedUrl.slashes = true;
  parsedUrl.host = parsedUrl.host || DEFAULT_HOST;

  const [databaseName = '', collectionName = ''] = parsedUrl.pathname
    .split('/')
    .slice(1);
  parsedUrl.pathname = databaseName ? `/${databaseName}` : '';

  const client = new Client(parsedUrl.toString());
  if (databaseName) {
    const database = client.database(databaseName);
    return collectionName ? database.collection(collectionName) : database;
  } else if (collectionName) {
    return client.collection(collectionName);
  }
  return client;
}
