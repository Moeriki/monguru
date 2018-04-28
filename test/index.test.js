import { MongoClient } from 'mongodb';

import monguru, { Client, Collection, Database } from '../lib';

jest.mock('mongodb', () => ({ MongoClient: jest.fn() }));

describe('monguru()', () => {
  beforeEach(() => {
    MongoClient.mockReset();
  });

  it('should connect with nothing', () => {
    const client = monguru();
    expect(client).toBeInstanceOf(Client);
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost');
  });

  it('should connect with database', () => {
    const database = monguru('///test-db');
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('name', 'test-db');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost/test-db');
  });

  it('should connect with collection', () => {
    const collection = monguru('////test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost');
  });

  it('should connect with database, collection', () => {
    const collection = monguru('///test-db/test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost/test-db');
  });

  it('should connect with host', () => {
    const client = monguru('//0.0.0.0');
    expect(client).toBeInstanceOf(Client);
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0');
  });

  it('should connect with host, database', () => {
    const database = monguru('//0.0.0.0/test-db');
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('name', 'test-db');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0/test-db');
  });

  it('should connect with host, collection', () => {
    const collection = monguru('//0.0.0.0//test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0');
  });

  it('should connect with host, database, collection', () => {
    const collection = monguru('//0.0.0.0/test-db/test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0/test-db');
  });

  it('should connect with protocol', () => {
    const client = monguru('mongodb:');
    expect(client).toBeInstanceOf(Client);
    expect(MongoClient).toHaveBeenCalledWith('mongodb://localhost');
  });

  it('should connect with protocol, host', () => {
    const client = monguru('mongodb://0.0.0.0');
    expect(client).toBeInstanceOf(Client);
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0');
  });

  it('should connect with protocol, host, database', () => {
    const database = monguru('mongodb://0.0.0.0/test-db');
    expect(database).toBeInstanceOf(Database);
    expect(database).toHaveProperty('name', 'test-db');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0/test-db');
  });

  it('should connect with protocol, host, collection', () => {
    const collection = monguru('mongodb://0.0.0.0//test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0');
  });

  it('should connect with protocol, host, database, collection', () => {
    const collection = monguru('mongodb://0.0.0.0/test-db/test-collection');
    expect(collection).toBeInstanceOf(Collection);
    expect(collection).toHaveProperty('name', 'test-collection');
    expect(MongoClient).toHaveBeenCalledWith('mongodb://0.0.0.0/test-db');
  });
});
