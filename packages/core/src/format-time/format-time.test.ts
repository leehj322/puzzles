import { describe, expect, it } from "vitest";

import { formatTime } from "./format-time";

describe("formatTime", () => {
  it("formats zero as 00:00", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("formats less than a minute correctly", () => {
    expect(formatTime(7_000)).toBe("00:07");
    expect(formatTime(59_999)).toBe("00:59");
  });

  it("formats minutes correctly", () => {
    expect(formatTime(60_000)).toBe("01:00");
    expect(formatTime(125_000)).toBe("02:05");
  });

  it("clamps negative values to 00:00", () => {
    expect(formatTime(-100)).toBe("00:00");
  });
});
