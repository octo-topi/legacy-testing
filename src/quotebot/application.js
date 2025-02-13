import { AutomaticQuoteBot } from "./AutomaticQuoteBot.js";

const main = () => {
  const bot = new AutomaticQuoteBot();
  bot.sendAllQuotes("FAST");
};

await main();
