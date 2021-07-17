import { splitCommand } from "../utils/setViewBox";

describe("splitCommand", () => {
  it("should split svg path into command", () => {
    expect(splitCommand(" M 13 -123.123 L3-56.1233")).toEqual([
      { command: "M", params: [13, -123.123] },
      { command: "L", params: [3, -56.1233] },
    ]);
  });
});
