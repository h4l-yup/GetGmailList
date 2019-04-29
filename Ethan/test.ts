import { GmailCrawlerImpl } from "./api/GmailCrawlerImpl";
import { expect } from "chai";

const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

describe("Gmail crawler", async () => {
    const gmailCrawler = new GmailCrawlerImpl();
    const credential = {
        identifier: 'ronet423@playauto.co.kr',
        password: 'playauto',
    };
    it("get mail list", async () => {
        await gmailCrawler.gmailInit(credential.identifier, credential.password);
        const list = await gmailCrawler.getGmailList();
        expect(list).to.be.an('array');
    }).timeout(0)
})