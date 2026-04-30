import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters falsy values", () => {
    const condition = false as boolean;
    expect(cn("a", condition && "b", null, undefined, "c")).toBe("a c");
  });
});
