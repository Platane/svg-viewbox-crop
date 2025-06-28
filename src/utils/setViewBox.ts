import {
  Box,
  getTransformsForCommand,
  unGroupCommand,
} from "./getTransformsForCommand";

const round = (x: number) => Math.round(x * 10000) / 10000;

export const parseViewBox = (vb: string): Box => {
  const [x = 0, y = 0, width = 1, height = 1] = splitNumberParam(vb);
  return { x, y, width, height };
};
export const stringifyViewBox = ({ x, y, width, height }: Box): string =>
  [x, y, width, height].map(round).join(" ");

/**
 * given a command string, split each command
 */
export const splitCommand = (text: string) => {
  const commands = "hvascqtmlz";
  const c = commands + commands.toUpperCase();
  const re = new RegExp(`([${c}])([^${c}]*)`, "g");

  return [...(text as any).matchAll(re)].map(([_, command, params]) => ({
    command,
    params: splitNumberParam(params),
  }));
};

/**
 * parse a list of number as string
 */
export const splitNumberParam = (text: string): number[] =>
  splitDot(text)
    .replace(/-/g, " -")
    .replace(/[ ,]+/g, " ")
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => parseFloat(x));

const splitDot = (text: string) => {
  const t = text.replace(/(\d*)\.(\d*)\./, (_, a, b) => `${a}.${b} .`);

  if (t === text) return text;

  return splitDot(t);
};

export const setViewBox = (d: string, o: Box, t: Box): string => {
  // debugger;

  const commands = splitCommand(d)
    .map(({ command, params }) => unGroupCommand(command, params))
    .flat();

  return commands
    .map(
      ({ command, params }) =>
        command +
        getTransformsForCommand(command)
          .map((tr, i) => tr(o, t)(params[i]))
          .map(round)
          .join(" ")
    )
    .join("\n");
};
