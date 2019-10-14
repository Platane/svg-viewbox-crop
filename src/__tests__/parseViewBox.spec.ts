import { parseViewBox, stringifyViewBox } from "../utils/setViewBox";

describe("parseViewBox", () => {
  it("should parse viewbox", () => {
    expect(parseViewBox(" 13 -123.123 , 3-56.1233")).toEqual({
      x: 13,
      y: -123.123,
      width: 3,
      height: -56.1233
    });
  });
});

describe("parseViewBox", () => {
  it("should stringify viewbox", () => {
    expect(
      stringifyViewBox({
        x: 13,
        y: -123.123,
        width: 3,
        height: -56.1233
      })
    ).toEqual("13 -123.123 3 -56.1233");
  });
});
