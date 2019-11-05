type Box = { x: number; y: number; width: number; height: number };

const round = x => Math.round(x * 10000) / 10000;

export const parseViewBox = (vb: string): Box => {
  const [x = 0, y = 0, width = 1, height = 1] = splitNumberParam(vb);
  return { x, y, width, height };
};
export const stringifyViewBox = ({ x, y, width, height }: Box): string =>
  [x, y, width, height].map(round).join(" ");

export const splitCommand = (text: string) => {
  const commands = "hvascqmlz";
  const c = commands + commands.toUpperCase();
  const re = new RegExp(`([${c}])([^${c}]*)`, "g");

  return [...(text as any).matchAll(re)].map(([_, command, params]) => ({
    command,
    params: splitNumberParam(params)
  }));
};

export const splitNumberParam = (text: string): number[] =>
  text
    .replace(/-/g, " -")
    .replace(/[ ,]+/g, " ")
    .trim()
    .split(" ")
    .map(x => parseFloat(x));

const absolute = {
  x: (o: Box, t: Box) => (x: number) => ((x - o.x) * t.width) / o.width + t.x,
  y: (o: Box, t: Box) => (y: number) => ((y - o.y) * t.height) / o.height + t.y
};
const relative = {
  x: (o: Box, t: Box) => (x: number) => (x * t.width) / o.width,
  y: (o: Box, t: Box) => (y: number) => (y * t.height) / o.height
};
const pass = () => (x: number) => x;

const getTransforms = (command: string, arity: number) => {
  const tr = command === command.toLowerCase() ? relative : absolute;

  switch (command.toLowerCase()) {
    case "h":
      return Array.from({ length: arity }).map(() => tr.y);
    case "v":
      return Array.from({ length: arity }).map(() => tr.x);

    case "a":
      return [tr.x, tr.y, pass, pass, pass, tr.x, tr.y];

    case "s":
    case "c":
    case "q":
    case "m":
    case "l":
      return Array.from({ length: Math.floor(arity / 2) * 2 }).map((_, i) =>
        i % 2 ? tr.x : tr.y
      );

    case "z":
    default:
      return [];
  }
};

export const setViewBox = (d: string, o: Box, t: Box): string =>
  splitCommand(d)
    .map(
      ({ command, params }) =>
        command +
        getTransforms(command, params.length)
          .map((tr, i) => tr(o, t)(params[i]))
          .map(round)
          .join(" ")
    )
    .join("\n");
