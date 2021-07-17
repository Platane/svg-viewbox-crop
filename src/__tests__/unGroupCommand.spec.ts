import { unGroupCommand } from "../utils/getTransformsForCommand";

describe("unGroupCommand", () => {
  it("should ungroup command", () => {
    expect(unGroupCommand("L", [1, 2, 3, 4, 5, 6])).toEqual([
      { command: "L", params: [1, 2] },
      { command: "L", params: [3, 4] },
      { command: "L", params: [5, 6] },
    ]);
  });

  it("should ungroup command", () => {
    expect(unGroupCommand("Z", [1, 2, 3, 4, 5, 6])).toEqual([
      { command: "Z", params: [] },
    ]);
  });
});
