import { expect } from "chai";
import { AdSpace } from "../src/quotebot/AdSpace.js";
import { DatabaseRepositoryDouble } from "./DatabaseRepositoryDouble.js";

// unit test should be fast, so these test are not unit tests
describe("Integration test - AdSpace", () => {
  context("#getAdSpaces", () => {
    context("#when the cache has no 'blogs list' key", () => {
      it("should get a list of blogs from the database", function () {
        // given
        expect(AdSpace.cache.has("blogs list")).to.be.false;
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        AdSpace.getAdSpaces({ databaseRepository });

        // then
        expect(databaseRepository.hasBeenCalledOnce()).to.be.true;
      });
      it("should store them in the cache", function () {
        // given
        AdSpace.cache.delete("blogs list");
        expect(AdSpace.cache.has("blogs list")).to.be.false;
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        AdSpace.getAdSpaces({ databaseRepository });

        // then
        const blogs = AdSpace.cache.get("blogs list");
        expect(blogs).to.deep.equal(["A", "B"]);
      });
      it("should return the list of blogs", function () {
        // given
        AdSpace.cache.delete("blogs list");
        expect(AdSpace.cache.has("blogs list")).to.be.false;
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        const actual = AdSpace.getAdSpaces({ databaseRepository });

        // then
        expect(actual).to.deep.equal(["A", "B"]);
      });
    });

    context("#when the cache has a 'blogs list' key", () => {
      it("should not call the database", function () {
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
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        AdSpace.getAdSpaces({ databaseRepository });

        // then
        expect(databaseRepository.hasBeenCalledOnce()).to.be.false;
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
        const blogs = AdSpace.getAdSpaces({
          databaseRepository: new DatabaseRepositoryDouble([]),
        });

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
