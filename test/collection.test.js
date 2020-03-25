import { assign, map } from 'lodash/fp';
import { ObjectID } from 'mongodb';

import monguru from '../lib';

const George = { name: 'George', age: 58 };
const John = { name: 'John', age: 40 };
const Paul = { name: 'Paul', age: 75 };
const Ringo = { name: 'Ringo', age: 77 };
const Beatles = [George, John, Paul, Ringo];

const withId = assign({ _id: expect.any(ObjectID) });
const mapWithId = map(withId);

describe('Collection', () => {
  let collection;

  beforeEach(() => {
    collection = monguru('///test-monguru-collection/test-collection');
    return collection.find().delete();
  });

  describe('count()', () => {
    it.skip('should without query', async () => {
      await collection.create(Beatles);
      const count = await collection.count();
      expect(count).toBe(Beatles.length);
    });

    it.skip('should with query', async () => {
      await collection.create(Beatles);
      collection.count();
      expect(John).not.toHaveProperty('_id');
    });
  });

  describe('create()', () => {
    it('should insert many from array', async () => {
      const records = await collection.create(Beatles);
      expect(records).toEqual(mapWithId(Beatles));
      expect(Beatles).not.toHaveProperty('0._id');
    });

    it('should insert many from iterable');
  });

  describe('createOne()', () => {
    it('should insert one', async () => {
      const record = await collection.createOne(John);
      expect(record).toEqual(withId(John));
      expect(John).not.toHaveProperty('_id');
    });
  });

  describe('find()', () => {
    it('should find all via inquiry', async () => {
      await collection.create(Beatles);
      const fab2 = await collection.find({ age: { $gt: 70 } });
      expect(fab2).toEqual(mapWithId([Paul, Ringo]));
    });
  });

  describe('findOne()', () => {
    it('should find one via inquiry', () => {});
  });
});
