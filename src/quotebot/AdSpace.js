import { TechBlogs } from "./TechBlogs.js";

class AdSpace {
  static cache = new Map();

  constructor({ databaseRepository }) {
    this.databaseRepository = databaseRepository;
  }

  static getAdSpaces({ databaseRepository = TechBlogs }) {
    return new AdSpace({ databaseRepository }).getAdSpacesNonStatic();
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
