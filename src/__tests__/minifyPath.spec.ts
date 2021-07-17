import { minifyPath } from "../utils/minifyPath";

describe("minifyPath", () => {
  it("should simplify path", async () => {
    const d = "M1.00000,0.5555";

    const ds = await minifyPath(d);

    expect(ds).toBe("M1 .555");
  });
  it("should simplify path", async () => {
    const d = "M1.00000,0.5555";

    const ds = await minifyPath(d, { floatPrecision: 1 });

    expect(ds).toBe("M1 .6");
  });
});
