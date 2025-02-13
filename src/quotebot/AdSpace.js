import { TechBlogs } from "./TechBlogs.js";

class AdSpace {
  static cache = new Map();

  static getAdSpaces() {
    if (AdSpace.cache.has("blogs list")) {
      return AdSpace.cache.get("blogs list");
    }
    // FIXME : only return blogs that start with a 'T'
    const listAllBlogs = TechBlogs.listAllBlogs();
    AdSpace.cache.set("blogs list", listAllBlogs);
    return listAllBlogs;
  }
}

export { AdSpace };
