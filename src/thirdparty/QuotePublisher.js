class QuotePublisher {
  static INSTANCE = new QuotePublisher();

  publish(todayPrice) {
    throw new Error(
      "You've pushed a dummy auction to a real ads platform, the business is upset!",
    );
  }
}

export { QuotePublisher };
