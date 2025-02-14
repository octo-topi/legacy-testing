import { TechBlogs } from "./TechBlogs.js";

class AdSpace {
  static cache;

  constructor({ databaseRepository, cache }) {
    this.databaseRepository = databaseRepository;
    if (!cache) {
      if (!AdSpace.cache) {
        AdSpace.cache = new Map();
      }
    } else {
      AdSpace.cache = cache;
    }
  }

  static getAdSpaces({ databaseRepository = TechBlogs, cache }) {
    return new AdSpace({ databaseRepository, cache }).getAdSpacesNonStatic();
  }

  getAdSpacesNonStatic() {
    if (AdSpace.cache.has("blogs list")) {
      return AdSpace.cache.get("blogs list");
    }
    // FIXME : only return blogs that start with a 'T'
    const listAllBlogs = this.databaseRepository.listAllBlogs();
    AdSpace.cache.set("blogs list", listAllBlogs);
    return listAllBlogs;
  }
}

export { AdSpace };
