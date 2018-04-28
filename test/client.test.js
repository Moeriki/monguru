import monguru, { Database } from '../lib';

describe('Client', () => {
  let client;

  beforeEach(() => {
    client = monguru('//test-monguru-client');
  });

  describe('collection()', () => {
    it('should get collection from default database');
  });

  describe('database()', () => {
    it('should get named database', () => {
      const dev = client.database('dev');
      expect(dev).toBeInstanceOf(Database);
      expect(dev).toHaveProperty('name', 'dev');
    });

    it('should get named databases identically', () => {
      const dev1 = client.database('dev');
      const dev2 = client.database('dev');
      expect(dev1).toBe(dev2);
    });

    it('should get databases from proxy', () => {
      const { dev, prod } = client.database();
      expect(dev).toBeInstanceOf(Database);
      expect(dev).toHaveProperty('name', 'dev');
      expect(prod).toBeInstanceOf(Database);
      expect(prod).toHaveProperty('name', 'prod');
    });
  });
});
