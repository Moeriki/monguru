import monguru, { Collection } from '../lib';

describe('Database', () => {
  let database;

  beforeEach(() => {
    database = monguru().database('test-monguru');
  });

  describe('collection()', () => {
    it('should get named collection', () => {
      const singers = database.collection('singers');
      expect(singers).toBeInstanceOf(Collection);
      expect(singers).toHaveProperty('name', 'singers');
    });

    it('should get named collections identically', () => {
      const singers1 = database.collection('singers');
      const singers2 = database.collection('singers');
      expect(singers1).toBe(singers2);
    });

    it('should get collection from proxy', () => {
      const { bands, singers } = database.collection();
      expect(bands).toBeInstanceOf(Collection);
      expect(bands).toHaveProperty('name', 'bands');
      expect(singers).toBeInstanceOf(Collection);
      expect(singers).toHaveProperty('name', 'singers');
    });
  });
});
