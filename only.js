const flat = require('flat');

module.exports = (object, ...keys) => {
  if (Array.isArray(keys[0])) keys = keys[0];

  const flatObject = flat.flatten(object);
  const flatKeys = [];

  function flattenKeys(keys, prevKey = '') {
    for (const key of keys) {
      if (typeof key === 'string') {
        flatKeys.push(prevKey ? `${prevKey}.${key}` : key);
      } else {
        for (const [_key, _keys] of Object.entries(key)) {
          flattenKeys(_keys, prevKey ? `${prevKey}.${_key}` : _key);
        }
      }
    }
  }

  flattenKeys(keys);

  const siftedFlatObject = {};

  for (const flatKey of flatKeys) {
    const value = flatObject[flatKey];

    if (value !== undefined) {
      siftedFlatObject[flatKey] = value;
    }
  }

  const siftedObject = flat.unflatten(siftedFlatObject);

  return Object.keys(siftedObject).length ? siftedObject : null;
};
