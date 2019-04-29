import { GmailCrawlerImpl } from "./api/GmailCrawlerImpl";
import { GmailCrawler } from "api/GmailCrawler";

const app = async (gmailCrawler: GmailCrawler) => {
    console.log('app is running..');
    const getCredential = await gmailCrawler.getCredential();

    await gmailCrawler.gmailInit(getCredential.identifier, getCredential.password);
    const list = await gmailCrawler.getGmailList();
    console.log(list);
};

app(new GmailCrawlerImpl()).then(() => process.exit(0))
