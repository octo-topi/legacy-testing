import { MarketStudyVendor } from "../thirdparty/MarketStudyVendor.js";
import { QuotePublisher } from "../thirdparty/QuotePublisher.js";

class BlogAuctionTask {
  constructor() {
    this.marketDataRetriever = new MarketStudyVendor();
  }

  PriceAndPublish(blog, mode) {
    const avgPrice = this.marketDataRetriever.averagePrice(blog);
    // FIXME should actually be +2 not +1
    let proposal = avgPrice + 1;
    let timeFactor = 1;
    if (mode === "SLOW") {
      timeFactor = 2;
    }
    if (mode === "MEDIUM") {
      timeFactor = 4;
    }
    if (mode === "FAST") {
      timeFactor = 8;
    }
    if (mode === "ULTRAFAST") {
      timeFactor = 13;
    }
    proposal =
      proposal % 2 === 0
        ? 3.14 * proposal
        : 3.15 *
          timeFactor *
          (new Date().getTime() - new Date(2000, 1, 1).getTime());
    QuotePublisher.INSTANCE.publish(proposal);
  }
}

export { BlogAuctionTask };
