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

  [
    //
    { str: "13", params: [13] },
    { str: "13 24", params: [13, 24] },
    { str: "13,24", params: [13, 24] },
    { str: "13.24", params: [13.24] },
    { str: "13-24", params: [13, -24] },
    { str: "4.86.6", params: [4.86, 0.6] },
    { str: ".86.6", params: [0.86, 0.6] },
    { str: "-.86.6", params: [-0.86, 0.6] }
  ].forEach(({ str, params }, i) =>
    it(`parse "${str}"`, () => {
      expect(splitNumberParam(str)).toEqual(params);
    })
  );
});
