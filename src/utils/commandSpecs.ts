export const commandSpecs = {
  M: ["absolute_x", "absolute_y"],
  L: ["absolute_x", "absolute_y"],
  T: ["absolute_x", "absolute_y"],
  C: [
    "absolute_x",
    "absolute_y",
    "absolute_x",
    "absolute_y",
    "absolute_x",
    "absolute_y"
  ],
  Q: ["absolute_x", "absolute_y", "absolute_x", "absolute_y"],
  S: ["absolute_x", "absolute_y", "absolute_x", "absolute_y"],
  V: ["absolute_x"],
  H: ["absolute_y"],
  A: [
    "absolute_x",
    "absolute_y",
    "pass",
    "pass",
    "pass",
    "absolute_x",
    "absolute_y"
  ],
  Z: [],

  m: ["relative_x", "relative_y"],
  l: ["relative_x", "relative_y"],
  t: ["relative_x", "relative_y"],
  c: [
    "relative_x",
    "relative_y",
    "relative_x",
    "relative_y",
    "relative_x",
    "relative_y"
  ],
  q: ["relative_x", "relative_y", "relative_x", "relative_y"],
  s: ["relative_x", "relative_y", "relative_x", "relative_y"],
  v: ["relative_x"],
  h: ["relative_y"],
  a: [
    "relative_x",
    "relative_y",
    "pass",
    "pass",
    "pass",
    "relative_x",
    "relative_y"
  ],
  z: []
} as const;
