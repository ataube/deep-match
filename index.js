module.exports = function deepMatch(obj, example) {
  // If the example is a function, execute it
  if (typeof example === 'function') return example(obj);

  // If the example is a regular expression, match it
  if (example instanceof RegExp) return example.test(obj || '');

  // Identitical values always match.
  if (obj === example) return true;

  // Values of different types never match.
  if (typeof obj !== typeof example) return false;

  // Values that are no objects only match if they are identical (see above).
  if (typeof obj !== 'object') return false;

  // Null values (which are also objects) only match if both are null.
  if (obj === null || example === null) return false;

  // Arrays match if all items in the example match.
  if (example instanceof Array) {
    return example.every(function (item) {
      return obj instanceof Array && obj.some(function (o) {
        return deepMatch(o, item);
      });
    });
  }

  // Objects match if all properties in the example match.
  return Object.keys(example).every(function (prop) {
    return deepMatch(obj[prop], example[prop]);
  });
};
