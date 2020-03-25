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
      const development = client.database('dev');
      expect(development).toBeInstanceOf(Database);
      expect(development).toHaveProperty('name', 'dev');
    });

    it('should get named databases identically', () => {
      const development1 = client.database('dev');
      const development2 = client.database('dev');
      expect(development1).toBe(development2);
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
