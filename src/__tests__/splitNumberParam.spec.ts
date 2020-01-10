import { splitNumberParam } from "../utils/setViewBox";

describe("splitNumberParam", () => {
  it("should split number params", () => {
    expect(splitNumberParam(" 13 -123.123 , 3-56.1233")).toEqual([
      13,
      -123.123,
      3,
      -56.1233
    ]);
    expect(splitNumberParam("4,4,0,0, 1-4.86.6")).toEqual([
      4,
      4,
      0,
      0,
      1,
      -4.86,
      0.6
    ]);
  });
});
