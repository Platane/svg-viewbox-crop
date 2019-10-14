import { commandSpecs } from "./commandSpecs";

type Box = { x: number; y: number; width: number; height: number };

const round = x => Math.round(x * 10000) / 10000;

export const parseViewBox = (vb: string): Box => {
  const [x = 0, y = 0, width = 1, height = 1] = splitNumberParam(vb);
  return { x, y, width, height };
};
export const stringifyViewBox = ({ x, y, width, height }: Box): string =>
  [x, y, width, height].map(round).join(" ");

export const splitCommand = (text: string) => {
  const c = Object.keys(commandSpecs).join("");
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

export const setViewBox = (d: string, o: Box, t: Box): string =>
  splitCommand(d)
    .map(
      ({ command, params }) =>
        command +
        commandSpecs[command]
          .map((type, i) => {
            switch (type) {
              case "absolute_x":
                return ((params[i] - o.x) * t.width) / o.width + t.x;
              case "absolute_y":
                return ((params[i] - o.y) * t.height) / o.height + t.y;
              case "relative_x":
                return (params[i] * t.width) / o.width;
              case "relative_y":
                return (params[i] * t.height) / o.height;
              case "pass":
                return params[i];
            }
          })
          .map(round)
          .join(" ")
    )
    .join("\n");
