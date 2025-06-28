export type Box = { x: number; y: number; width: number; height: number };

const commandArity = {
  z: 0,
  v: 1,
  h: 1,
  m: 2,
  t: 2,
  l: 2,
  q: 4,
  s: 4,
  c: 6,
  a: 7,
};

/**
 * return an list of transform function to apply to each params for a given command
 *
 * https://www.w3.org/TR/SVG/paths.html#PathDataBNF
 */
export const getTransformsForCommand = (command: string) => {
  const c = command.toLowerCase();
  const tr = command === c ? relative : absolute;

  switch (c) {
    case "h":
      return [tr.x];

    case "v":
      return [tr.y];

    case "a":
      return [relative.x, relative.y, pass, pass, pass, tr.x, tr.y];

    case "s":
    case "c":
    case "q":
    case "t":
    case "m":
    case "l":
      return Array.from({ length: commandArity[c] }).map((_, i) =>
        i % 2 ? tr.y : tr.x
      );

    case "z":
    default:
      return [];
  }
};

/**
 * collection of transform fn
 */
const absolute = {
  x: (o: Box, t: Box) => (x: number) => ((x - o.x) * t.width) / o.width + t.x,
  y: (o: Box, t: Box) => (y: number) => ((y - o.y) * t.height) / o.height + t.y,
};
const relative = {
  x: (o: Box, t: Box) => (x: number) => (x * t.width) / o.width,
  y: (o: Box, t: Box) => (y: number) => (y * t.height) / o.height,
};
const pass = () => (x: number) => x;

/**
 * command can be group
 * L 1 2 3 4
 * means
 * L 1 2 L 3 4
 *
 * ungroup
 */
export const unGroupCommand = (command: string, params: number[]) => {
  const arity =
    commandArity[command.toLowerCase() as keyof typeof commandArity];

  if (arity === 0) return [{ command, params: [] }];

  if (!arity) return [];

  return Array.from({
    length: Math.floor(params.length / arity),
  }).map((_, i) => ({
    command,
    params: params.slice(i * arity, (i + 1) * arity),
  }));
};
