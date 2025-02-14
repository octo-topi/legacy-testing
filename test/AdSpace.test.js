import { expect } from "chai";
import { AdSpace } from "../src/quotebot/AdSpace.js";

// unit test should be fast, so these test are not unit tests
describe("Integration test - AdSpace", () => {
  context("#getAdSpaces", () => {
    const FIVE_SECONDS = 5 * 1000;
    const ONE_SECOND = 1000;
    const TIME_ELAPSED_IN_DATABASE = FIVE_SECONDS;
    context("#when the cache has no 'blogs list' key", () => {
      it("should get a list of blogs from the database", function () {
        // given
        expect(AdSpace.cache.has("blogs list")).to.be.false;

        // when
        // as default test timeout is 2 seconds, and database last 5 seconds
        // we should remove the test timeout for test to be executed
        this.timeout(TIME_ELAPSED_IN_DATABASE + ONE_SECOND);
        const start = Date.now();
        AdSpace.getAdSpaces();
        const elapsed = Date.now() - start;

        // then

        // assert indirectly that database has been called
        expect(elapsed).to.be.greaterThan(TIME_ELAPSED_IN_DATABASE);
      });

      it("should store them in the cache", function () {
        // given
        AdSpace.cache.delete("blogs list");
        expect(AdSpace.cache.has("blogs list")).to.be.false;

        // when
        // as default test timeout is 2 seconds, and database last 5 seconds
        // we should remove the test timeout for test to be executed
        this.timeout(TIME_ELAPSED_IN_DATABASE + ONE_SECOND);
        AdSpace.getAdSpaces();

        // then
        const blogs = AdSpace.cache.get("blogs list");
        expect(blogs).to.deep.equal([
          "HackerNews",
          "Reddit",
          "TechCrunch",
          "BuzzFeed",
          "TMZ",
          "TheHuffPost",
          "GigaOM",
        ]);
      });
      it("should return the list of blogs", function () {
        // given
        AdSpace.cache.delete("blogs list");
        expect(AdSpace.cache.has("blogs list")).to.be.false;

        // when
        // as default test timeout is 2 seconds, and database last 5 seconds
        // we should remove the test timeout for test to be executed
        this.timeout(TIME_ELAPSED_IN_DATABASE + ONE_SECOND);
        const blogs = AdSpace.getAdSpaces();

        // then
        expect(blogs).to.deep.equal([
          "HackerNews",
          "Reddit",
          "TechCrunch",
          "BuzzFeed",
          "TMZ",
          "TheHuffPost",
          "GigaOM",
        ]);
      });
    });

    context("#when the cache has a 'blogs list' key", () => {
      it("should not call the database", function () {
        // given
        this.timeout(TIME_ELAPSED_IN_DATABASE + ONE_SECOND);
        AdSpace.cache.set("blogs list", [
          "HackerNews",
          "Reddit",
          "TechCrunch",
          "BuzzFeed",
          "TMZ",
          "TheHuffPost",
          "GigaOM",
        ]);

        // when
        const start = Date.now();
        AdSpace.getAdSpaces();
        const elapsed = Date.now() - start;

        // then
        expect(elapsed).to.be.lessThan(TIME_ELAPSED_IN_DATABASE);
      });
      it("should return the list", function () {
        // given
        AdSpace.cache.set("blogs list", [
          "HackerNews",
          "Reddit",
          "TechCrunch",
          "BuzzFeed",
          "TMZ",
          "TheHuffPost",
          "GigaOM",
        ]);

        // when
        const blogs = AdSpace.getAdSpaces();

        // then
        expect(blogs).to.deep.equal([
          "HackerNews",
          "Reddit",
          "TechCrunch",
          "BuzzFeed",
          "TMZ",
          "TheHuffPost",
          "GigaOM",
        ]);
      });
    });
  });
});
