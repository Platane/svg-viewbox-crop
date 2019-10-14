const fromEntriesPolyfill = iterable =>
  Object.assign({}, ...[...iterable].map(([key, val]) => ({ [key]: val })));

// @ts-ignore
Object.fromEntries = Object.fromEntries || fromEntriesPolyfill;
