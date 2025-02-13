import { expect } from "chai";

describe("unit test", () => {
  context("when we start", () => {
    it("should fail", () => {
      // given
      const expected = true;

      // when
      const actual = false;

      // then
      expect(actual).to.equal(expected);
    });
  });
});
