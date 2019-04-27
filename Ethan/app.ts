import { GmailCrawlerImpl } from "./api/GmailCrawlerImpl";
import { CrawlerIOImpl } from "./api/CrawlerIOImpl";
import { CrawlerIO } from "api/CrawlerIo";
import { GmailCrawler } from "api/GmailCrawler";

const app = async (crawlerIO: CrawlerIO, gmailCrawler: GmailCrawler) => {
    console.log('app is running..');
    const getCredential = await crawlerIO.getCredential();

    await gmailCrawler.gmailInit(getCredential.identifier, getCredential.password);
    const list = await gmailCrawler.getGmailList();
    console.log(list);
};

app(new CrawlerIOImpl(), new GmailCrawlerImpl()).then(() => process.exit(0))
