export type Box = { x: number; y: number; width: number; height: number };

/**
 * return an list of transform function to apply to each params for a given command
 *
 * https://www.w3.org/TR/SVG/paths.html#PathDataBNF
 */
export const getTransformsForCommand = (command: string, arity: number) => {
  const tr = command === command.toLowerCase() ? relative : absolute;

  switch (command.toLowerCase()) {
    case "h":
      return Array.from({ length: arity }).map(() => tr.x);
    case "v":
      return Array.from({ length: arity }).map(() => tr.y);

    case "a":
      return [].concat(
        ...Array.from({ length: Math.floor(arity / 7) }).map(
          () => [relative.x, relative.y, pass, pass, pass, tr.x, tr.y] as any
        )
      );

    case "s":
    case "c":
    case "q":
    case "t":
    case "m":
    case "l":
      return Array.from({ length: Math.floor(arity / 2) * 2 }).map((_, i) =>
        i % 2 ? tr.y : tr.x
      );

    case "z":
    default:
      return [];
  }
};

/**
 * collection of transfom fn
 */
const absolute = {
  x: (o: Box, t: Box) => (x: number) => ((x - o.x) * t.width) / o.width + t.x,
  y: (o: Box, t: Box) => (y: number) => ((y - o.y) * t.height) / o.height + t.y
};
const relative = {
  x: (o: Box, t: Box) => (x: number) => (x * t.width) / o.width,
  y: (o: Box, t: Box) => (y: number) => (y * t.height) / o.height
};
const pass = () => (x: number) => x;
