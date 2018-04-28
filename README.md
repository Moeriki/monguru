# monguru

_Say: mon guru_ 🥖🇫🇷

A [MongoDB](https://www.mongodb.com) interface.

## Why

* No models, but services
* Async iterables
* Optional JSON schema
  * Type casting / enforcement
  * Default values
* Flexible hook / plugin system

## Quick start

```
npm install --save monguru mongodb@3
```

```js
const monguru = require('monguru');

const { members } = monguru().collection();

(async () => {
  await members.create([
    { name: 'John', age: 40 },
    { name: 'Paul', age: 75 },
    { name: 'Ringo', age: 77 },
    { name: 'George', age: 58 },
  ]);
  for (user of await members.find({ age: { $gte: 70 } })) {
    console.log(user.name);
    // Paul
    // Ringo
  }
})();
```

## Connect

See [MongoDB connection string](https://docs.mongodb.com/manual/reference/connection-string/).

```js
monguru(connectionString);
```

```js
const connection = monguru();
// same as
const connection = monguru('mongodb://localhost:27017');
```

### Get database

```js
const beatles = monguru().database('beatles');
// same as
const { beatles } = monguru().database();
```

## Collection

```js
const members = beatles.collection('members');
// same as
const { members } = beatles.collection();
```

You can get a collection without specifying a database. Monguru will default to
the `default` database.

```js
const { members } = monguru().collection();
```

### With optional schema

```js
const schema = {
  properties: {
    age: { type: 'number' },
    name: { type: 'string' },
  },
  required: ['name'],
};
const members = beatles.collection('members', { schema });
```

### Create

TODO

### Find

```js
collection.find();

users.create([{ age: 30 }, { age: 31 }]);

users.createOne({ age: 30 });

users.findOne({ age: 30 }).then((one) => {
  //
});

users.find({ age: 30 }, { limit: 10 }).then((users) => {
  /* */
});

users
  .find(
    { age: 30 },
    {
      limit: 0,
      skip: 0,
      sort: /(a(sc(ending)?)?|d(esc(ending)?)?|n(at(ural)?)?)/i,
    }
  )
  .then(); // lazily evaluated promise

users.find({ age: 30 }).update({ $set: { age: 31 } });

users.find({ age: 30 }).delete();
```

#### Iterables

```js
for (user of users.find({ age: 30 })) {
  // iterable
}
```

#### Async iterables

```js
for (await user of users.find({ age: 30 })) {
  // async iterable
}
```

### Update

TODO

### Delete

TODO

### Aggregation

```js
users
  .aggregate()
  .match({ age: 30 })
  .project({ age: 1 })
  .group();
```

## API

### constructor

#### `ormongo( [connection:string], [options:object] ) :database`

#### Options

* ?

#### Examples

```js
// defaults to localhost on default port
const host = ormongo();
```

```js
const database = ormongo('mongodb://host:port/database');
```

### database

#### `collection( identifer:string )`

### collection
