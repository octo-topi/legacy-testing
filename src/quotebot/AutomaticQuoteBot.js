import { AdSpace } from "./AdSpace.js";
import { BlogAuctionTask } from "./BlogAuctionTask.js";

class AutomaticQuoteBot {
  sendAllQuotes = (mode) => {
    const blogs = AdSpace.getAdSpaces();
    for (const blog of blogs) {
      const auctionTask = new BlogAuctionTask();
      auctionTask.PriceAndPublish(blog, mode);
    }
  };
}

export { AutomaticQuoteBot };
