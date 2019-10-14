import { splitNumberParam } from "../utils/setViewBox";

describe("splitNumberParam", () => {
  it("should split number params", () => {
    expect(splitNumberParam(" 13 -123.123 , 3-56.1233")).toEqual([
      13,
      -123.123,
      3,
      -56.1233
    ]);
  });
});
