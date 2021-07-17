import { splitNumberParam } from "../utils/setViewBox";

describe("splitNumberParam", () => {
  it("should split number params", () => {
    expect(splitNumberParam(" 13 -123.123 , 3-56.1233")).toEqual([
      13, -123.123, 3, -56.1233,
    ]);
  });

  [
    { str: "13", params: [13] },
    { str: "13 24", params: [13, 24] },
    { str: "13,24", params: [13, 24] },
    { str: "13.24", params: [13.24] },
    { str: "13-24", params: [13, -24] },
    { str: "4.86.6", params: [4.86, 0.6] },
    { str: ".86.6", params: [0.86, 0.6] },
    { str: "-.86.6", params: [-0.86, 0.6] },
    {
      str: ".78.5.975",
      params: [0.78, 0.5, 0.975],
    },
    {
      str: ".021.11-.044.307.031.466.094.602.229.78.5.975",
      params: [
        0.021, 0.11, -0.044, 0.307, 0.031, 0.466, 0.094, 0.602, 0.229, 0.78,
        0.5, 0.975,
      ],
    },
  ].forEach(({ str, params }, i) =>
    it(`parse "${str}"`, () => {
      expect(splitNumberParam(str)).toEqual(params);
    })
  );
});
