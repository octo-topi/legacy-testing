import { execSync } from "child_process";

class TechBlogs {
  static listAllBlogs() {
    // Access to DB are very slow
    execSync("sleep 5");

    return [
      "HackerNews",
      "Reddit",
      "TechCrunch",
      "BuzzFeed",
      "TMZ",
      "TheHuffPost",
      "GigaOM",
    ];
  }
}

export { TechBlogs };
