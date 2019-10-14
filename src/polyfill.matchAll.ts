const matchAll = (re: RegExp, text: string) => {
  re.lastIndex = 0;

  const res: string[][] = [];

  let m;
  while ((m = re.exec(text))) res.push(m);

  return res;
};

const matchAllPolyfill = function(re: RegExp) {
  return matchAll(re, this);
};

// @ts-ignore
String.prototype.matchAll = String.prototype.matchAll || matchAllPolyfill;
