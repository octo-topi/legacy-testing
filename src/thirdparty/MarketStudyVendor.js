import crypto from "node:crypto";

class MarketStudyVendor {
  averagePrice(blog) {
    if (process.env.license === undefined) {
      throw new Error("Missing license");
    }
    return (
      crypto.createHash("md5").update(blog).digest("hex").toString() *
      Math.random()
    );
  }
}

export { MarketStudyVendor };
