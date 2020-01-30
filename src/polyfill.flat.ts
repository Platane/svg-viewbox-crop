const flatOne = arr => [].concat(...arr);

const flat = (arr, n = 1) => {
  if (n <= 0 || !arr.some(Array.isArray)) return arr;
  return flat(flatOne(arr), n - 1);
};

const flatPolyfill = function(n?: number) {
  return flat(this, n);
};

// @ts-ignore
Array.prototype.flat = Array.prototype.flat || flatPolyfill;
