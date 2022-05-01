import assert from "assert";
import { joinUpTo } from "../../src/lib/joinUpTo";

const alphabet = ["abcdefg", "hijklmnop", "qrs", "tuv", "wxyz"];

describe("joinUpto", () => {
  it("should include up to 20", () => {
    assert.equal(joinUpTo(alphabet, "--", 20), "abcdefg--hijklmnop");
  });
  it("should include everything given enough space", () => {
    assert.equal(
      joinUpTo(alphabet, "--", Number.MAX_SAFE_INTEGER),
      "abcdefg--hijklmnop--qrs--tuv--wxyz"
    );
  });
  it("should include nothing if not enough space for the first one", () => {
    assert.equal(joinUpTo(alphabet, "--", 1), "");
  });
  it("should include the first one if it just fits", () => {
    assert.equal(joinUpTo(alphabet, "--", 7), "abcdefg");
  });
  it("should include the first one if boundary hits in the middle of the second", () => {
    assert.equal(joinUpTo(alphabet, "--", 10), "abcdefg");
  });
});
