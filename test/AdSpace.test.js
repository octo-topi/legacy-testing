import { expect } from "chai";
import { AdSpace } from "../src/quotebot/AdSpace.js";
import { DatabaseRepositoryDouble } from "./DatabaseRepositoryDouble.js";

describe("Unit test - AdSpace", () => {
  context("#getAdSpaces", () => {
    context("when the cache has no 'blogs list' key", () => {
      it("should get a list of blogs from the database", function () {
        // given
        const cache = new Map();
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        AdSpace.getAdSpaces({ databaseRepository, cache });

        // then
        expect(databaseRepository.hasBeenCalledOnce()).to.be.true;
      });
      it("should store them in the cache", function () {
        // given
        const cache = new Map();
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        AdSpace.getAdSpaces({ databaseRepository, cache });

        // then
        const blogs = cache.get("blogs list");
        expect(blogs).to.deep.equal(["A", "B"]);
      });
      it("should return the list of blogs", function () {
        // given
        const cache = new Map();
        const databaseRepository = new DatabaseRepositoryDouble({
          blogs: ["A", "B"],
        });

        // when
        const actual = AdSpace.getAdSpaces({ databaseRepository, cache });

        // then
        expect(actual).to.deep.equal(["A", "B"]);
      });
    });

    context("when the cache has a 'blogs list' key", () => {
      it("should not call the database", function () {
        // given
        const databaseRepository = new DatabaseRepositoryDouble({ blogs: [] });
        const cache = new Map();
        cache.set("blogs list", []);

        // when
        AdSpace.getAdSpaces({ databaseRepository, cache });

        // then
        expect(databaseRepository.hasBeenCalledOnce()).to.be.false;
      });
      it("should return the list", function () {
        // given
        const databaseRepository = {
          listAllBlogs: () => {},
        };
        const cache = new Map();
        cache.set("blogs list", ["A", "B"]);

        // when
        const blogs = AdSpace.getAdSpaces({
          databaseRepository: new DatabaseRepositoryDouble([]),
          cache,
        });

        // then
        expect(blogs).to.deep.equal(["A", "B"]);
      });
    });
  });
});
